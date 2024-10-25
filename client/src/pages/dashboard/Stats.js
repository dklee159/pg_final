import { useEffect } from "react";
import { StatsContainer } from "../../components";
import { useDispatch } from "react-redux";
import { getAllTeams, showStats } from "../../features/allTeams/allTeamsSlice";

const Stats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTeams());
    dispatch(showStats());
  }, []);
  return (
    <>
      <StatsContainer />
    </>
  );
};
export default Stats;
