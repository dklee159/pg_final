import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/admin/adminSlice";
import teamSlice from "./features/team/teamSlice";
import allTeamsSlice from "./features/allTeams/allTeamsSlice";
import playerSlice from "./features/player/playerSlice";
import modalSlice from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    player: playerSlice,
    team: teamSlice,
    allTeams: allTeamsSlice,
    modal: modalSlice,
  },
});
