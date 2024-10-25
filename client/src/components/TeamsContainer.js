import { useEffect } from "react";
import Team from "./Team";
import Wrapper from "../assets/wrappers/TeamsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";
import { getAllTeams } from "../features/allTeams/allTeamsSlice";

const TeamsContainer = () => {
  const { teams, isLoading, page, totalTeams, numOfPages, search, searchStatus, searchNum, sort } = useSelector((store) => store.allTeams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeams());
  }, [page, search, searchStatus, searchNum, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (teams.length === 0) {
    return (
      <Wrapper>
        <h4>No Teams results to display...</h4>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalTeams} result{teams.length > 1 && "s"} found
      </h5>
      <div className="teams">
        {teams.map((team) => {
          return <Team key={team._id} {...team} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default TeamsContainer;
