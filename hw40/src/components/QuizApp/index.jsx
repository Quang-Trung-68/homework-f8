import { useEffect, useReducer, useState, useRef } from "react";
import Questions from "./Questions";
import { QuizContext } from "./QuizContext.js";
import Question from "./Question.jsx";
import Action from "./Action.jsx";

const QuizApp = () => {
  const quizReducer = (state, action) => {
    if (action.type === "answerCurrent/confirm") {
      state.answerCurrent = action.value;
      return { ...state };
    }

    if (action.type === "isChecked/check") {
      if (state.questionCurrent.answer === state.answerCurrent) {
        setResult(result + 1);
        return { ...state, isChecked: true };
      } else {
        return { ...state, isChecked: false };
      }
    }

    if (action.type === "timeUp/autoCheck") {
      // Tự động kiểm tra khi hết thời gian
      if (state.answerCurrent) {
        // Nếu đã chọn đáp án
        if (state.questionCurrent.answer === state.answerCurrent) {
          setResult(result + 1);
          return { ...state, isChecked: true };
        } else {
          return { ...state, isChecked: false };
        }
      } else {
        // Nếu chưa chọn đáp án thì coi như sai
        return { ...state, isChecked: false };
      }
    }

    if (action.type === "isNextQuestion") {
      return {
        questionCurrent: Questions[count],
        answerCurrent: null,
        isChecked: null,
      };
    }
  };

  const [count, setCount] = useState(0);
  const [result, setResult] = useState(0);
  const [isEnd, setIsEnd] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerRef = useRef(null);

  const [state, dispatch] = useReducer(quizReducer, {
    questionCurrent: Questions[count],
    answerCurrent: null,
    isChecked: null,
  });

  // Effect để khởi tạo câu hỏi mới
  useEffect(() => {
    if (count < Questions.length) {
      dispatch({ type: "isNextQuestion" });
      // Reset timer khi chuyển câu mới
      setTimeLeft(30);
      setIsTimeUp(false);
    }
  }, [count]);

  // Effect để đếm ngược thời gian
  useEffect(() => {
    // Chỉ chạy timer khi chưa kiểm tra và chưa hết thời gian
    if (state.isChecked === null && !isTimeUp && !isEnd) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Hết thời gian
            setIsTimeUp(true);
            clearInterval(timerRef.current);
            // Tự động kiểm tra kết quả
            dispatch({ type: "timeUp/autoCheck" });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      // Dừng timer khi đã kiểm tra hoặc hết thời gian
      clearInterval(timerRef.current);
    }

    // Cleanup timer
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isChecked, isTimeUp, isEnd]);

  // Cleanup timer khi component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleNextQuestion = () => {
    if (count < Questions.length - 1) {
      setCount(count + 1);
    }
    if (count === Questions.length - 1 && (state.isChecked !== null || isTimeUp))
      setIsEnd(true);
  };

  const onReStart = () => {
    setResult(0);
    setIsEnd(null);
    setCount(0);
    setTimeLeft(30);
    setIsTimeUp(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleManualCheck = () => {
    // Dừng timer khi người dùng nhấn check thủ công
    setIsTimeUp(true);
    clearInterval(timerRef.current);
    dispatch({ type: "isChecked/check" });
  };

  const currentQ = Questions[count];
  const provider = {
    state,
    dispatch,
    result,
    isEnd,
    count,
    currentQ,
    handleNextQuestion,
    onReStart,
    timeLeft,
    isTimeUp,
    handleManualCheck,
  };

  return (
    <QuizContext value={provider}>
      <Question />
      <Action />
    </QuizContext>
  );
};

export default QuizApp;