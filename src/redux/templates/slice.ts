import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListTemplatesRes, Template, State } from "./types";

const initialState: State = {
  templatesLoading: false,
  templateSaving: false,
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
    patchTemplatePending: (state) => {
      state.templateSaving = true;
    },
    patchTemplateSuccess: (state, { payload }: PayloadAction<Template>) => {
      state.templateSaving = false;
      state.templates!.values[payload.id] = {
        ...state.templates!.values[payload.id],
        ...payload,
      };
    },
    patchTemplateFailure: (state) => {
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
      }: PayloadAction<Template> & {
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
    createTemplateSuccess: (state, { payload }: PayloadAction<Template>) => {
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
