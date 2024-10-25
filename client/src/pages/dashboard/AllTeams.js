import { useDispatch } from "react-redux";
import { TeamsContainer, SearchContainer } from "../../components";
import { useEffect } from "react";
import { showStats } from "../../features/allTeams/allTeamsSlice";

const AllTeams = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return (
    <>
      <SearchContainer />
      <TeamsContainer />
    </>
  );
};
export default AllTeams;
