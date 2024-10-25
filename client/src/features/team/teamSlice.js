import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createTeamThunk, editTeamThunk } from "./teamThunk";

const initialState = {
  isLoading: false,
  teamOptions: [
    "A",
  ],
  team: "",
  quizNumOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
  quizNum: "",
  statusOptions: ["correct", "wrong"],
  status: "",
  isEditing: false,
  teamId: "",
};

export const createTeam = createAsyncThunk("team/createTeam", createTeamThunk);
export const editTeam = createAsyncThunk("team/editTeam", editTeamThunk);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    setEditTeam: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTeam.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Answered Created");
      })
      .addCase(createTeam.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTeam.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Answered Modified...");
      })
      .addCase(editTeam.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditTeam } = teamSlice.actions;

export default teamSlice.reducer;
