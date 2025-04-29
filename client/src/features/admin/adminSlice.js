import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addAdminToLocalStorage,
  getAdminFromLocalStorage,
  removeAdminFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginAdminThunk,
  registerAdminThunk,
  clearStoreThunk,
} from "./adminThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  admin: getAdminFromLocalStorage(),
};

export const registerAdmin = createAsyncThunk(
  "admin/registerAdmin",
  async (admin, thunkAPI) => {
    return registerAdminThunk("/auth/register", admin, thunkAPI);
  }
);

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (admin, thunkAPI) => {
    return loginAdminThunk("/auth/login", admin, thunkAPI);
  }
);

export const clearStore = createAsyncThunk("admin/clearStore", clearStoreThunk);
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutAdmin: (state, { payload }) => {
      state.admin = null;
      state.isSidebarOpen = false;
      removeAdminFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAdmin.fulfilled, (state, { payload }) => {
        const { admin } = payload;
        state.isLoading = false;
        state.admin = admin;
        addAdminToLocalStorage(admin);
        toast.success(`Hello There ${admin.name}`);
      })
      .addCase(registerAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        const { admin } = payload;
        state.isLoading = false;
        state.admin = admin;
        addAdminToLocalStorage(admin);

        toast.success(`Welcome Back ${admin.name}`);
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      });
  },
});

export const { toggleSidebar, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
