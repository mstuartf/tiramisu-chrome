import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, User } from "./types";

const initialState: State = {
  loginPending: false,
  userLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
    },
    loginPending: (state) => {
      state.loginPending = true;
    },
    loginSuccess: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>
    ) => {
      state.loginPending = false;
      state.token = token;
    },
    loginFailure: (state) => {
      state.loginPending = false;
    },
    logout: (state) => {
      state.token = null;
    },
    fetchUserPending: (state) => {
      state.userLoading = true;
    },
    fetchUserSuccess: (state, { payload }: PayloadAction<User>) => {
      state.userLoading = false;
      state.user = payload;
    },
    fetchUserFailure: (state) => {
      state.userLoading = false;
    },
  },
});

export const { setToken, logout } = userSlice.actions;
