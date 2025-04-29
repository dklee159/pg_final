import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addPlayerToLocalStorage,
  getPlayerFromLocalStorage,
  removePlayerFromLocalStorage,
} from "../../utils/localStorage";
import {
  clearStorePlayerThunk,
  loginPlayerThunk,
  registerPlayerThunk,
} from "./playerThunk";

const initialState = {
  isLoading: false,
  player: getPlayerFromLocalStorage(),
};

export const registerPlayer = createAsyncThunk(
  "player/registerPlayer",
  async (player, thunkAPI) => {
    return registerPlayerThunk("/auth/registerPlayer", player, thunkAPI);
  }
);

export const loginPlayer = createAsyncThunk(
  "player/loginPlayer",
  async (player, thunkAPI) => {
    return loginPlayerThunk("/auth/loginPlayer", player, thunkAPI);
  }
);

export const clearStorePlayer = createAsyncThunk(
  "player/clearStore",
  clearStorePlayerThunk
);
const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    logoutPlayer: (state, { payload }) => {
      state.player = null;
      removePlayerFromLocalStorage();
      // if (payload) {
      //   toast.success(payload);
      // }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPlayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerPlayer.fulfilled, (state, { payload }) => {
        const { player } = payload;
        state.isLoading = false;
        state.player = player;
        addPlayerToLocalStorage(player);
        toast.success(`Hello There ${player.team}`);
      })
      .addCase(registerPlayer.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginPlayer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginPlayer.fulfilled, (state, { payload }) => {
        const { player } = payload;
        state.isLoading = false;
        state.player = player;
        addPlayerToLocalStorage(player);

        toast.success(`Welcome Back ${player.team}`);
      })
      .addCase(loginPlayer.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStorePlayer.rejected, () => {
        toast.error("There was an error..");
      });
  },
});

export const { logoutPlayer } = playerSlice.actions;
export default playerSlice.reducer;
