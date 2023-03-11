import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./types";

const initialState: State = {
  loginPending: false,
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
  },
});

export const { setToken, logout } = userSlice.actions;
