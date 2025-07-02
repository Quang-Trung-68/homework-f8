import { useEffect, useReducer, useState } from "react";
import Questions from "./Questions";
import { QuizContext } from "./QuizContext.js";
import Question from "./Question.jsx";

const QuizApp = () => {
  const quizReducer = (state, action) => {
    console.log(state);
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

  const provider = { state, dispatch };

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
  console.log(currentQ);

  return (
    <QuizContext value={provider}>
      <Question currentQ={currentQ} result={result} />

      <div>
        <button
          onClick={() => {
            dispatch({ type: "isChecked/check" });
          }}
          disabled={state.isChecked !== null || state.answerCurrent === null}
        >
          DAY LA CAU TRA LOI CUOI CUNG CUA TOI
        </button>

        <button
          onClick={() => {
            handleNextQuestion();
          }}
          disabled={state.isChecked === null || isEnd}
        >
          {count < Questions.length - 1
            ? "CHUYEN SANG CAU TIEP THEO"
            : "HIEN KET QUA"}
        </button>
        {state.isChecked === false ? (
          <div>
            DAP AN: {state.isChecked === null ? "" : `${currentQ.answer}`}
          </div>
        ) : (
          ""
        )}
        {isEnd ? (
          <>
            <div>DIEM CUA BAN LA: {result} DIEM </div>
            <button onClick={onReStart}>LAM LAI</button>
          </>
        ) : (
          ""
        )}
      </div>
    </QuizContext>
  );
};

export default QuizApp;
