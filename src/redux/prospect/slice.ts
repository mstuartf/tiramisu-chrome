import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedInProfile, MessageSet, State } from "./types";

const initialState: State = {
  isLoadingProfile: false,
  isLoadingMessages: false,
};

export const prospectSlice = createSlice({
  name: "prospect",
  initialState,
  reducers: {
    reset: (state) => {
      state.profile = undefined;
      state.messages = undefined;
      state.profileError = undefined;
      state.messagesError = undefined;
    },
    setProfileSlug: (state, { payload }: PayloadAction<string | undefined>) => {
      state.profileSlug = payload;
      state.profile = undefined;
      state.messages = undefined;
      state.profileError = undefined;
      state.messagesError = undefined;
    },
    fetchProspectProfilePending: (state, action) => {
      state.isLoadingProfile = true;
    },
    fetchProspectProfileSuccess: (
      state,
      { payload }: PayloadAction<LinkedInProfile>
    ) => {
      state.isLoadingProfile = false;
      state.profile = payload;
    },
    fetchProspectProfileFailure: (
      state,
      { payload: { status } }: PayloadAction<{ status: number }>
    ) => {
      state.isLoadingProfile = false;
      state.profileError = status;
    },
    generateMessagesPending: (state, action) => {
      state.isLoadingMessages = true;
      state.messages = undefined;
    },
    generateMessagesSuccess: (
      state,
      { payload }: PayloadAction<MessageSet>
    ) => {
      state.isLoadingMessages = false;
      state.messages = payload;
    },
    generateMessagesFailure: (
      state,
      { payload: { status } }: PayloadAction<{ status: number }>
    ) => {
      state.isLoadingMessages = false;
      state.messagesError = status;
    },
  },
});

export const { setProfileSlug, reset } = prospectSlice.actions;
