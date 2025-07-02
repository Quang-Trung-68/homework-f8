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
        questionCurrent: Questions[count],
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

      {currentQ.options.map((curr, index) => {
        let buttonStyle = {
          margin: "5px",
          padding: "10px 15px",
          cursor: "pointer",
          fontSize: "16px",
        };

        // Logic styling
        if (curr === state.answerCurrent && state.isChecked === true) {
          // Đã chọn và đã kiểm tra - hiển thị kết quả
          buttonStyle.background = curr === currentQ.answer ? "lightgreen" : "";
        } else if (curr === state.answerCurrent && state.isChecked === false) {
          // Đã chọn và đã kiểm tra ra sai - hiển thị kết quả
          buttonStyle.background = curr !== currentQ.answer ? "red" : "";
        } else if (curr === state.answerCurrent && state.isChecked === null) {
          // Đang chọn nhưng chưa kiểm tra
          buttonStyle.background = "lightblue";
        } else if (state.isChecked === true && curr === currentQ.answer) {
          // Hiển thị đáp án đúng sau khi check
          buttonStyle.background = "lightgreen";
        }

        return (
          <button
            key={index}
            onClick={() =>
              dispatch({
                type: "answerCurrent/confirm",
                value: curr,
              })
            }
            style={buttonStyle}
          >
            {curr}
          </button>
        );
      })}
      {/* <div>
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
      </div> */}

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
