import { useEffect, useReducer, useState } from "react";
import Questions from "./Questions";

const QuizApp = () => {
  const quizReducer = (state, action) => {
    console.log(state);
    if (action.type === "answerCurrent/confirm") {
      state.answerCurrent = action.value;
      return { ...state };
    }

    if (action.type === "isChecked/check") {
      if (state.questionCurrent.answer === state.answerCurrent) {
        return { ...state, isChecked: true };
      } else {
        return { ...state, isChecked: false };
      }
    }

    if (action.type === "isNextQuestion") {
      return {
        questionCurrent : Questions[count],
        answerCurrent: null,
        isChecked: null,
      };
    }
  };
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < Questions.length) {
      dispatch({ type: "isNextQuestion" });
    }
  }, [count]);

  const [state, dispatch] = useReducer(quizReducer, {
    questionCurrent: Questions[count],
    answerCurrent: null,
    isChecked: null,
  });

  const handleNextQuestion = () => {
    if (state.isChecked && count < Questions.length - 1) {
      setCount(count + 1);
    }
  };
  const currentQ = Questions[count];
  console.log(currentQ);

  return (
    <>
      <p>Cau : {count}</p>
      <p>Question: {currentQ.question} </p>
      <p>Thoi gian: 30s </p>
      <div>
        <button
          onClick={() =>
            dispatch({
              type: "answerCurrent/confirm",
              value: currentQ.options[0],
            })
          }
        >
          {currentQ.options[0]}
        </button>

        <button
          onClick={() =>
            dispatch({
              type: "answerCurrent/confirm",
              value: currentQ.options[1],
            })
          }
        >
          {currentQ.options[1]}
        </button>

        <button
          onClick={() =>
            dispatch({
              type: "answerCurrent/confirm",
              value: currentQ.options[2],
            })
          }
        >
          {currentQ.options[2]}
        </button>

        <button
          onClick={() =>
            dispatch({
              type: "answerCurrent/confirm",
              value: currentQ.options[3],
            })
          }
        >
          {currentQ.options[3]}
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "isChecked/check" });
          }}
        >
          DAY LA CAU TRA LOI CUOI CUNG CUA TOI
        </button>

        <button
          onClick={() => {
            handleNextQuestion();
          }}
        >
          CHUYEN SANG CAU TIEP THEO
        </button>
      </div>
    </>
  );
};

export default QuizApp;
