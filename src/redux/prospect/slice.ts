import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkedInProfile, State } from "./types";

const initialState: State = {
  isLoadingProfile: false,
};

export const prospectSlice = createSlice({
  name: "prospect",
  initialState,
  reducers: {
    setProfileSlug: (state, { payload }: PayloadAction<string | undefined>) => {
      state.profileSlug = payload;
      state.profile = undefined;
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
  },
});

export const { setProfileSlug } = prospectSlice.actions;
