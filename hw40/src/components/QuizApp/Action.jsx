import { useContext } from "react";
import { QuizContext } from "./QuizContext";
import Questions from "./Questions";

export default function Action() {
  const injector = useContext(QuizContext);
  const { 
    state, 
    dispatch, 
    handleNextQuestion, 
    isEnd, 
    count, 
    currentQ, 
    result, 
    onReStart,
    timeLeft,
    isTimeUp,
    handleManualCheck
  } = injector;

  return (
    <div className="actions-container">
      <div className="action-buttons">
        <button
          className="btn-primary"
          onClick={handleManualCheck}
          disabled={state.isChecked !== null || state.answerCurrent === null || isTimeUp}
        >
          {timeLeft > 0 ? "Đây là câu trả lời cuối cùng của tôi" : "Hết thời gian"}
        </button>

        <button
          className="btn-secondary"
          onClick={() => {
            handleNextQuestion();
          }}
          disabled={state.isChecked === null && !isTimeUp}
        >
          {count < Questions.length - 1
            ? "Chuyển sang câu tiếp theo"
            : "Hiện kết quả"}
        </button>
      </div>

      {(state.isChecked === false || (isTimeUp && !state.answerCurrent)) && (
        <div className="answer-reveal">
          {isTimeUp && !state.answerCurrent ? (
            <>
              ⏰ Hết thời gian! Bạn chưa chọn đáp án.<br />
              💡 Đáp án đúng: {currentQ.answer}
            </>
          ) : (
            <>💡 Đáp án đúng: {currentQ.answer}</>
          )}
        </div>
      )}

      {state.isChecked === true && (
        <div className="correct-message">
          🎉 Chính xác! Bạn đã trả lời đúng!
        </div>
      )}

      {isEnd && (
        <div className="results-container">
          <div className="final-score">
            🎉 Điểm của bạn là: {result}/10 điểm
          </div>
          <div className="score-description">
            {result >= 8 ? "🏆 Xuất sắc!" : 
             result >= 6 ? "👍 Khá tốt!" : 
             result >= 4 ? "📚 Cần cố gắng thêm!" : 
             "💪 Hãy thử lại!"}
          </div>
          <button className="restart-btn" onClick={onReStart}>
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
}