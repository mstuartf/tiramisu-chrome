import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListUsersRes, State, User } from "./types";

const initialState: State = {
  loginPending: false,
  userLoading: false,
  teamLoading: false,
  invitePending: false,
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
      { payload: { access } }: PayloadAction<{ access: string }>
    ) => {
      state.loginPending = false;
      state.token = access;
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
    listTeamPending: (state) => {
      state.teamLoading = true;
    },
    listTeamSuccess: (state, { payload }: PayloadAction<ListUsersRes>) => {
      state.teamLoading = false;
      state.team = {
        ids: payload.map(({ id }) => id),
        values: payload.reduce(
          (prev, next) => ({
            ...prev,
            [next.id]: next,
          }),
          {}
        ),
      };
    },
    listTeamFailure: (state) => {
      state.teamLoading = false;
    },
  },
});

export const { setToken, logout } = userSlice.actions;
