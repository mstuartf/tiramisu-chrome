import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedInProfile, MessageSet, State } from "./types";
import { RootState } from "../store";

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
    fetchMessageSetPending: (state) => {
      state.isLoadingMessages = true;
    },
    fetchMessageSetSuccess: (state, { payload }: PayloadAction<MessageSet>) => {
      state.isLoadingMessages = false;
      state.messages = payload;
    },
    fetchMessageSetFailure: (
      state,
      { payload: { status } }: PayloadAction<{ status: number }>
    ) => {
      state.isLoadingMessages = false;
      state.messagesError = status;
    },
  },
  extraReducers: {
    "user/loadCache": (
      state,
      { payload: { cache } }: PayloadAction<{ key: string; cache?: RootState }>
    ) => {
      if (cache) {
        Object.entries(cache.prospect).forEach(([k, v]) => {
          (state as any)[k] = v;
        });
      }
    },
  },
});

export const { setProfile } = prospectSlice.actions;
