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
    setProfile: (
      state,
      { payload }: PayloadAction<LinkedInProfile | undefined>
    ) => {
      state.profile = payload;
      state.messages = undefined;
      state.profileError = undefined;
      state.messagesError = undefined;
      state.isLoadingProfile = false;
      state.isLoadingMessages = false;
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

export const { setProfile } = prospectSlice.actions;
