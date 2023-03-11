import { RootState } from "../store";

export const selectPrompts = (state: RootState) => state.prompts.prompts;
export const selectPromptsIsLoading = (state: RootState) =>
  state.prompts.promptsLoading;
