import { RootState } from "../store";

export const selectProspectProfile = (state: RootState) =>
  state.prospect.profile;
export const selectProspectMessagesIsLoading = (state: RootState) =>
  state.prospect.isLoadingMessages;
export const selectProspectMessages = (state: RootState) =>
  state.prospect.messages;
export const selectProspectMessageSetId = (state: RootState) =>
  state.prospect.messages?.id;
export const selectProspectMessagesProcessed = (state: RootState) =>
  state.prospect.messages?.processed;
export const selectProspectMessagesError = (state: RootState) =>
  state.prospect.messagesError;
