import customFetch from '../../utils/axios';
import { clearAllTeamsState } from '../allTeams/allTeamsSlice';
import { clearValues } from '../team/teamSlice';
import { logoutAdmin } from './adminSlice';
export const registerAdminThunk = async (url, admin, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, admin);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginAdminThunk = async (url, admin, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, admin);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutAdmin(message));
    thunkAPI.dispatch(clearAllTeamsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
