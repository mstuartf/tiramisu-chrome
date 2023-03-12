import { RootState } from "../store";

export const selectTokenLoaded = (state: RootState) =>
  state.user.token !== undefined;

export const selectToken = (state: RootState) => state.user.token;

export const selectIsLoggedIn = (state: RootState) => state.user.token !== null;

export const selectLoginPending = (state: RootState) => state.user.loginPending;

export const selectUser = (state: RootState) => state.user.user;
