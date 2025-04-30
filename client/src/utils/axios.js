import axios from "axios";
import { clearStore } from "../features/admin/adminSlice";
import { getAdminFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

customFetch.interceptors.request.use((config) => {
  const admin = getAdminFromLocalStorage();
  if (admin) {
    config.headers["Authorization"] = `Bearer ${admin.token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
