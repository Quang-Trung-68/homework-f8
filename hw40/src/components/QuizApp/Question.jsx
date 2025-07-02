import { useContext } from "react"
import { QuizContext } from "./QuizContext"

export default function Question({currentQ, result}){

     const injector = useContext(QuizContext)

    const {state, dispatch} = injector
    console.log(state);

    return(
        <>
         <p>Cau : {currentQ.id}</p>
      <p>Question: {currentQ.question} </p>
      <p>Thoi gian: 30s </p>
      <p>DIEM HIEN TAI: {result} / 10 </p>

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
            disabled={state.isChecked !== null}
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

        </>
    )
}