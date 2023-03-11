import { RootState } from "../store";

export const selectProspectSlug = (state: RootState) =>
  state.prospect.profileSlug;
export const selectProspectProfile = (state: RootState) =>
  state.prospect.profile;
export const selectProspectProfileIsLoading = (state: RootState) =>
  state.prospect.isLoadingProfile;
export const selectProspectProfileError = (state: RootState) =>
  state.prospect.profileError;
export const selectProspectMessagesIsLoading = (state: RootState) =>
  state.prospect.isLoadingMessages;
export const selectProspectMessages = (state: RootState) =>
  state.prospect.messages;
