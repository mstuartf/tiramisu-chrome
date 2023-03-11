import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListPromptsRes, State } from "./types";

const initialState: State = {
  promptsLoading: false,
};

export const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    listPromptsPending: (state) => {
      state.promptsLoading = true;
    },
    listPromptsSuccess: (
      state,
      { payload: { results } }: PayloadAction<ListPromptsRes>
    ) => {
      state.promptsLoading = false;
      state.prompts = results;
    },
    listPromptsFailure: (state) => {
      state.promptsLoading = false;
    },
  },
});

export const {} = promptSlice.actions;
