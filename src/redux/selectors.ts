import { RootState } from "./store";

export const selectPromptTemplates = (state: RootState) => state.prompts.templates;
