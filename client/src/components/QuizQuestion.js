import { Questions } from "../assets/quizzes";

const QuizQuestion = ({ type, quizNum }) => {
  const questions = { ...Questions };
  return (
    <>
      <h4>Quiz {quizNum}</h4>
      <p>{questions[parseInt(quizNum) - 1]}</p>
    </>
  );
};

export default QuizQuestion;
