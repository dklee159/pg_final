import customFetch from "../../utils/axios";
import { clearValues } from "../team/teamSlice";
import { logoutPlayer } from "./playerSlice";

export const registerPlayerThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginPlayerThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

//submit 후에 제거 할 때 사용??? 원래는 로그아웃에서 이용
export const clearStorePlayerThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutPlayer(message));
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
