import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListPromptsRes, Prompt, State } from "./types";

const initialState: State = {
  promptsLoading: false,
  promptSaving: false,
};

// @ts-ignore
// @ts-ignore
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
      state.prompts = {
        ids: results.map(({ id }) => id),
        values: results.reduce(
          (prev, next) => ({
            ...prev,
            [next.id]: next,
          }),
          {}
        ),
      };
    },
    listPromptsFailure: (state) => {
      state.promptsLoading = false;
    },
    patchPromptPending: (state) => {
      state.promptSaving = true;
    },
    patchPromptSuccess: (state, { payload }: PayloadAction<Prompt>) => {
      state.promptSaving = false;
      state.prompts!.values[payload.id] = payload;
    },
    patchPromptFailure: (state) => {
      state.promptSaving = false;
    },
    deletePromptPending: (state) => {
      state.promptSaving = true;
    },
    // @ts-ignore
    deletePromptSuccess: (
      state,
      {
        payload,
        meta: {
          originalRequest: { url },
        },
      }: PayloadAction<Prompt> & { meta: { originalRequest: { url: string } } }
    ) => {
      state.promptSaving = false;
      const id = url.split("prompts/")[1].replace("/", "");
      delete state.prompts!.values[id];
    },
    deletePromptFailure: (state) => {
      state.promptSaving = false;
    },
  },
});

export const {} = promptSlice.actions;
