import { RootState } from "../store";
import { State } from "./types";
import { createSelector } from "@reduxjs/toolkit";

export const selectPromptState = (state: RootState): State => state.prompts;

export const selectPromptIds = (state: RootState): string[] | undefined => {
  if (!state.prompts.prompts) {
    return undefined;
  }
  return Object.values(state.prompts.prompts.values)
    .sort((a, b) => {
      if (a.custom === b.custom) {
        return b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1;
      }
      return b.custom > a.custom ? -1 : 1;
    })
    .map(({ id }) => id);
};
export const selectPromptsIsLoading = (state: RootState) =>
  state.prompts.promptsLoading;

export const createSelectPrompt = (id: string) =>
  createSelector(selectPromptState, ({ prompts }) => prompts!.values[id]);

export const selectPromptsIsSaving = (state: RootState) =>
  state.prompts.promptSaving;
