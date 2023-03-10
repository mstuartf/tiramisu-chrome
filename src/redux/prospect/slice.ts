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
    setProfileSlug: (state, { payload }: PayloadAction<string | undefined>) => {
      state.profileSlug = payload;
      state.profile = undefined;
      state.messages = undefined;
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
    generateMessagesPending: (state, action) => {
      state.isLoadingMessages = true;
    },
    generateMessagesSuccess: (
      state,
      { payload }: PayloadAction<MessageSet>
    ) => {
      state.isLoadingMessages = false;
      state.messages = payload;
    },
  },
});

export const { setProfileSlug } = prospectSlice.actions;
