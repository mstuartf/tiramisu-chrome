import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListTemplatesRes, ITemplate, State } from "./types";

const initialState: State = {
  templatesLoading: false,
  templateSaving: false,
  templateSavingErrors: [],
};

// @ts-ignore
// @ts-ignore
export const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    selectTemplate: (state, { payload }: PayloadAction<string>) => {
      state.selectedTemplate = payload;
    },
    listTemplatesPending: (state) => {
      state.templatesLoading = true;
    },
    listTemplatesSuccess: (
      state,
      { payload }: PayloadAction<ListTemplatesRes>
    ) => {
      state.templatesLoading = false;
      state.templates = {
        ids: payload.map(({ id }) => id),
        values: payload.reduce(
          (prev, next) => ({
            ...prev,
            [next.id]: next,
          }),
          {}
        ),
      };
      state.selectedTemplate = state.templates.ids[0];
    },
    listTemplatesFailure: (state) => {
      state.templatesLoading = false;
    },
    putTemplatePending: (state) => {
      state.templateSaving = true;
    },
    putTemplateSuccess: (state, { payload }: PayloadAction<ITemplate>) => {
      state.templateSaving = false;
      state.templates!.values[payload.id] = {
        ...state.templates!.values[payload.id],
        ...payload,
      };
    },
    putTemplateFailure: (state) => {
      state.templateSaving = false;
    },
    deleteTemplatePending: (state) => {
      state.templateSaving = true;
    },
    // @ts-ignore
    deleteTemplateSuccess: (
      state,
      {
        meta: {
          originalRequest: { url },
        },
      }: PayloadAction<ITemplate> & {
        meta: { originalRequest: { url: string } };
      }
    ) => {
      state.templateSaving = false;
      const id = url.split("templates/")[1].replace("/", "");
      delete state.templates!.values[id];
    },
    deleteTemplateFailure: (state) => {
      state.templateSaving = false;
    },
    createTemplatePending: (state) => {
      state.templateSaving = true;
    },
    createTemplateSuccess: (state, { payload }: PayloadAction<ITemplate>) => {
      state.templateSaving = false;
      state.templates!.ids.push(payload.id);
      state.templates!.values[payload.id] = payload;
    },
    createTemplateFailure: (state) => {
      state.templateSaving = false;
    },
  },
});

export const { selectTemplate } = templateSlice.actions;
