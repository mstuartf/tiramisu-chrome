import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  profileSlug?: string;
}

const initialState: State = {};

export const prospectSlice = createSlice({
  name: "prospect",
  initialState,
  reducers: {
    setProfileSlug: (state, {payload}: PayloadAction<string | undefined>) => {
      state.profileSlug = payload;
    }
  },
});

export const {setProfileSlug} = prospectSlice.actions;
