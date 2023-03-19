import { RootState } from "../store";
import { State } from "./types";
import { createSelector } from "@reduxjs/toolkit";

export const selectTemplateState = (state: RootState): State => state.templates;

export const selectTemplateIds = (state: RootState): string[] | undefined => {
  if (!state.templates.templates) {
    return undefined;
  }
  return Object.values(state.templates.templates.values)
    .sort((a, b) => {
      // if (a.custom === b.custom) {
      return b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1;
      // }
      // return b.custom > a.custom ? -1 : 1;
    })
    .map(({ id }) => id);
};
export const selectTemplatesIsLoading = (state: RootState) =>
  state.templates.templatesLoading;

export const selectTemplateStyleIds = (state: RootState) =>
  state.templates.templateStyles?.ids;

export const selectTemplateStyles = (state: RootState) =>
  state.templates.templateStyles?.values;

export const selectTemplateSectionTypeIds = (state: RootState) =>
  state.templates.templateSectionTypes?.ids;

export const selectTemplateSectionTypes = (state: RootState) =>
  state.templates.templateSectionTypes?.values;

export const createSelectTemplate = (id: string) =>
  createSelector(selectTemplateState, ({ templates }) => templates!.values[id]);

export const selectTemplatesIsSaving = (state: RootState) =>
  state.templates.templateSaving;

export const selectTemplatesSavingErrors = (state: RootState) =>
  state.templates.templateSavingErrors;

export const selectSelectedTemplate = (state: RootState) =>
  state.templates.selectedTemplate;
