import { Examples } from "../assets/quizzes";

const QuizRadioRow = ({
  type,
  name,
  quizNum,
  value,
  handleChange,
  checked,
}) => {
  const examples = { ...Examples };
  return (
    <label className="form-label">
      <input
        type={type}
        className="form-radio"
        value={value}
        checked={checked === value}
        onChange={handleChange}
      />
      &nbsp; &nbsp;
      {examples[parseInt(quizNum) - 1][value]}
    </label>
  );
};

export default QuizRadioRow;
