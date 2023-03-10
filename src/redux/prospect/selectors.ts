import { RootState } from "../store";

export const selectProspectSlug = (state: RootState) =>
  state.prospect.profileSlug;
export const selectProspectProfile = (state: RootState) =>
  state.prospect.profile;
