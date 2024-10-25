import { showStats } from "../allTeams/allTeamsSlice";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./teamSlice";

export const createTeamThunk = async (team, thunkAPI) => {
  try {
    const resp = await customFetch.post("/teams", team);
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(showStats());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editTeamThunk = async ({ teamId, team }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/teams/${teamId}`, team);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
