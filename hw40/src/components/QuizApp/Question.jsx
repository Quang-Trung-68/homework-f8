import { useContext } from "react";
import { QuizContext } from "./QuizContext";

export default function Question() {
  const injector = useContext(QuizContext);
  const { state, dispatch, currentQ, result, timeLeft, isTimeUp } = injector;

  const getButtonClass = (option) => {
    let className = "option-button";
    
    if (option === state.answerCurrent && state.isChecked === true) {
      // Đã chọn và đã kiểm tra - hiển thị kết quả
      className += option === currentQ.answer ? " correct selected" : " incorrect selected";
    } else if (option === state.answerCurrent && state.isChecked === false) {
      // Đã chọn và đã kiểm tra ra sai - hiển thị kết quả
      className += " incorrect selected";
    } else if (option === state.answerCurrent && state.isChecked === null) {
      // Đang chọn nhưng chưa kiểm tra
      className += " selected";
    } else if (state.isChecked === true && option === currentQ.answer) {
      // Hiển thị đáp án đúng sau khi check
      className += " correct";
    }

    return className;
  };

  const getTimerClass = () => {
    if (timeLeft <= 5) return "timer timer-critical";
    if (timeLeft <= 10) return "timer timer-warning";
    return "timer";
  };

  const getTimerIcon = () => {
    if (timeLeft <= 5) return "🚨";
    if (timeLeft <= 10) return "⚠️";
    return "⏰";
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="question-number">
          Câu hỏi: {currentQ.id}
        </div>
        <div className="question-text">
          {currentQ.question}
        </div>
        <div className="quiz-meta">
          <div className={getTimerClass()}>
            {getTimerIcon()} Thời gian: {timeLeft}s
          </div>
          <div className="score">
            🏆 Điểm hiện tại: {result} / 10
          </div>
        </div>
      </div>

      <div className="options-container">
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            disabled={state.isChecked !== null || isTimeUp}
            onClick={() =>
              dispatch({
                type: "answerCurrent/confirm",
                value: option,
              })
            }
          >
            {option}
          </button>
        ))}
      </div>

      {isTimeUp && state.isChecked === null && (
        <div className="time-up-message">
          ⏰ Hết thời gian! Đang kiểm tra kết quả...
        </div>
      )}
    </div>
  );
}