import { useContext } from "react";
import { QuizContext } from "./QuizContext";
import Questions from "./Questions";

export default function Action() {
  const injector = useContext(QuizContext);

  const { state, dispatch, handleNextQuestion, isEnd, count, currentQ,result, onReStart } = injector;
  return (
    <>
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
    </>
  );
}
