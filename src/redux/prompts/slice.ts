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
    selectPrompt: (state, { payload }: PayloadAction<string>) => {
      state.selectedPrompt = payload;
    },
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
      state.selectedPrompt = state.prompts.ids[0];
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
    createPromptPending: (state) => {
      state.promptSaving = true;
    },
    createPromptSuccess: (state, { payload }: PayloadAction<Prompt>) => {
      state.promptSaving = false;
      state.prompts!.ids.push(payload.id);
      state.prompts!.values[payload.id] = payload;
    },
    createPromptFailure: (state) => {
      state.promptSaving = false;
    },
  },
});

export const { selectPrompt } = promptSlice.actions;
