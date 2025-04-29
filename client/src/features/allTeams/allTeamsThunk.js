import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllTeamsThunk = async (_, thunkAPI) => {  
  const { page, search, searchStatus, searchNum, sort } = thunkAPI.getState().allTeams;  
  let url = `/teams?status=${searchStatus}&quizNum=${searchNum}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/teams/stats");

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
