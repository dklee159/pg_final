import { Examples } from "../assets/quizzes";

const QuizSelectBox = ({ name, quizNum, example, value, handleChange }) => {
  const examples = { ...Examples };
  const list = ["", ...examples[parseInt(quizNum) - 1]];
  return (
    <div className="quiz-row">
      <label className="quiz-label">
        {example}&nbsp; &nbsp;
        <select
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className="quiz-select"
        >
          {list.map((itemValue, index) => {
            return (
              <option key={index + 1} value={itemValue}>
                {itemValue}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default QuizSelectBox;
