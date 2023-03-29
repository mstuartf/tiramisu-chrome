import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { State } from "./types";

export const selectUserState = (state: RootState): State => state.user;

export const selectAuth = (state: RootState) => state.user.auth;

export const selectLoginPending = (state: RootState) => state.user.loginPending;

export const selectCacheKey = (state: RootState) => state.user.cacheKey;

export const selectPath = (state: RootState) => state.user.path;

export const selectUser = (state: RootState) => state.user.user;

export const selectUserIsLoading = (state: RootState) => state.user.userLoading;

export const selectTeamIds = (state: RootState): string[] | undefined => {
  if (!state.user.team) {
    return undefined;
  }
  return Object.values(state.user.team.values)
    .sort((a, b) => {
      return b.email > a.email ? -1 : 1;
    })
    .map(({ id }) => id);
};

export const createSelectTeamMember = (id: string) =>
  createSelector(selectUserState, ({ team }) => team!.values[id]);

export const selectTeamLoading = (state: RootState) => state.user.teamLoading;
