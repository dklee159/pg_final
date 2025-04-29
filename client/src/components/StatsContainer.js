import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useDispatch, useSelector } from "react-redux";
import LoadingWrapper from "../assets/wrappers/LoadingWrapper";
import Loading from "./Loading";
import { useEffect } from "react";
import { getAllTeams } from "../features/allTeams/allTeamsSlice";

const StatsContainer = () => {
  const { stats, whole, isLoading } = useSelector((store) => store.allTeams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  const defaultStats = [
    {
      title: "TestTeamA",
      count: stats.TestTeamA || 0,
      color: "#1d4ed8",
    },
    {
      title: "TestTeamB",
      count: stats.TestTeamB || 0,
      color: "#1d4ed8",
    },
    {
      title: "TestTeamC",
      count: stats.TestTeamC || 0,
      color: "#1d4ed8",
    }
  ];

  const scoredStats = defaultStats
    .map((item) => {
      let score = 0;
      whole.forEach((teamData) => {
        if (teamData.team === item.title && teamData.status === "correct") {
          teamData.quizNum > 15 ? (score += 12.5) : (score += 5);
        }
      });
      return { ...item, score: score };
    })
    .sort((a, b) => {
      if (b.score === a.score) return a.title.localeCompare(b.title);
      return b.score - a.score;
    });

  if (isLoading) {
    return (
      <LoadingWrapper className="full-page">
        <Loading />
      </LoadingWrapper>
    );
  }

  if (whole.length === 0) {
    return (
      <Wrapper>
        <h4>No Teams results to display...</h4>
      </Wrapper>
    );
  }
  
  return (
    <Wrapper>
      {scoredStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
