import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllTeamsThunk, showStatsThunk } from "./allTeamsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all", //Wrong, Right
  searchNum: "all", //
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  teams: [],
  whole: [],
  totalTeams: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  ...initialFiltersState,
};

export const getAllTeams = createAsyncThunk(
  "allTeams/getTeams",
  getAllTeamsThunk
);

export const showStats = createAsyncThunk("allTeams/showStats", showStatsThunk);

const allTeamsSlice = createSlice({
  name: "allTeams",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllTeamsState: (_state) => initialState,
  },
  extraReducers: {
    [getAllTeams.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTeams.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.teams = payload.teams;
      state.whole = payload.whole;
      state.numOfPages = payload.numOfPages;
      state.totalTeams = payload.totalTeams;
    },
    [getAllTeams.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllTeamsState,
} = allTeamsSlice.actions;

export default allTeamsSlice.reducer;
