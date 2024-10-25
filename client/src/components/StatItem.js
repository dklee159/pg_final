import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, title, color }) => {
  const { whole } = useSelector((store) => store.allTeams);
  let correct = 0;
  let wrong = 0;
  let score = 0;

  whole.forEach((teamData) => {
    if (teamData.team === title) {
      if (teamData.status === "correct") {
        correct += 1;
        teamData.quizNum > 15 ? (score += 12.5) : (score += 5);
      } else {
        wrong += 1;
      }
    }
  });

  return (
    <Wrapper color={color}>
      <div className="parent">
        <div className="name">{title}</div>
        <div className="scored">Scored: {score}</div>
      </div>
      <hr />
      <header>
        <span className="count">Total: {count}</span>
        <span className="correct">Correct: {correct}</span>
        <span className="wrong">Wrong: {wrong}</span>
      </header>
    </Wrapper>
  );
};
export default StatItem;
