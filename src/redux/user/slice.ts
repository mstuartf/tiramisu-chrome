import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListUsersRes, State, User } from "./types";
import { RootState } from "../store";
import jwt_decode from "jwt-decode";

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
    loadCache: (
      state,
      {
        payload: { key, cache },
      }: PayloadAction<{ key: string; cache?: RootState }>
    ) => {
      if (cache) {
        Object.entries(cache.user).forEach(([k, v]) => {
          (state as any)[k] = v;
        });
      }
      state.cacheKey = key;
    },
    savePath: (state, { payload }: PayloadAction<string>) => {
      state.path = payload;
    },
    loginPending: (state) => {
      state.loginPending = true;
    },
    loginSuccess: (
      state,
      {
        payload: { access, refresh },
      }: PayloadAction<{ access: string; refresh: string }>
    ) => {
      state.loginPending = false;
      const { exp } = jwt_decode<{ exp: number }>(access);
      state.auth = { access, refresh, exp };
    },
    refreshSuccess: (
      state,
      {
        payload: { access, refresh },
      }: PayloadAction<{ access: string; refresh: string }>
    ) => {
      state.loginPending = false;
      const { exp } = jwt_decode<{ exp: number }>(access);
      state.auth = { access, refresh, exp };
    },
    loginFailure: (state) => {
      state.loginPending = false;
    },
    logout: (state) => {
      state.auth = undefined;
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
    patchUserPending: (state) => {
      state.userLoading = true;
    },
    patchUserSuccess: (state, { payload }: PayloadAction<User>) => {
      state.userLoading = false;
      state.user = payload;
    },
    patchUserFailure: (state) => {
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

export const { loadCache, logout, savePath } = userSlice.actions;
