import { useEffect, useReducer, useState } from "react";
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

  const [state, dispatch] = useReducer(quizReducer, {
    questionCurrent: Questions[count],
    answerCurrent: null,
    isChecked: null,
  });

  useEffect(() => {
    if (count < Questions.length) {
      dispatch({ type: "isNextQuestion" });
    }
  }, [count]);

  const handleNextQuestion = () => {
    if (count < Questions.length - 1) {
      setCount(count + 1);
    }
    if (count === Questions.length - 1 && state.isChecked !== null)
      setIsEnd(true);
  };

  const onReStart = () => {
    setResult(0);
    setIsEnd(null);
    setCount(0);
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
  };

  return (
    <QuizContext value={provider}>
      <Question />
      <Action />
    </QuizContext>
  );
};

export default QuizApp;
