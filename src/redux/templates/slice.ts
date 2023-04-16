import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ITemplate,
  ITemplateSectionType,
  ITemplateStyle,
  ListTemplatesRes,
  State,
} from "./types";
import { ErrorRes } from "../types";
import { RootState } from "../store";

const initialState: State = {
  templatesLoading: false,
  templateStylesLoading: false,
  templateSectionTypesLoading: false,
  templateSaving: false,
};

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
    listTemplateStylesPending: (state) => {
      state.templateStylesLoading = true;
    },
    listTemplateStylesSuccess: (
      state,
      { payload }: PayloadAction<ITemplateStyle[]>
    ) => {
      state.templateStylesLoading = false;
      state.templateStyles = {
        ids: payload.map(({ id }) => id),
        values: payload.reduce(
          (prev, next) => ({
            ...prev,
            [next.id]: next,
          }),
          {}
        ),
      };
    },
    listTemplateStylesFailure: (state) => {
      state.templateStylesLoading = false;
    },
    listTemplateSectionTypesPending: (state) => {
      state.templateSectionTypesLoading = true;
    },
    listTemplateSectionTypesSuccess: (
      state,
      { payload }: PayloadAction<ITemplateSectionType[]>
    ) => {
      state.templateSectionTypesLoading = false;
      state.templateSectionTypes = {
        ids: payload.map(({ id }) => id),
        values: payload.reduce(
          (prev, next) => ({
            ...prev,
            [next.id]: next,
          }),
          {}
        ),
      };
    },
    listTemplateSectionTypesFailure: (state) => {
      state.templateSectionTypesLoading = false;
    },
    putTemplatePending: (state) => {
      state.templateSaving = true;
      state.templateSavingErrors = undefined;
    },
    putTemplateSuccess: (state, { payload }: PayloadAction<ITemplate>) => {
      state.templateSaving = false;
      state.templates!.values[payload.id] = {
        ...state.templates!.values[payload.id],
        ...payload,
      };
    },
    putTemplateFailure: (state, { payload }: PayloadAction<ErrorRes>) => {
      state.templateSaving = false;
      state.templateSavingErrors = payload;
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
      state.templates!.ids = state.templates!.ids.filter(
        (templateId) => templateId !== id
      );
    },
    deleteTemplateFailure: (state) => {
      state.templateSaving = false;
    },
    createTemplatePending: (state) => {
      state.templateSaving = true;
      state.templateSavingErrors = undefined;
    },
    createTemplateSuccess: (state, { payload }: PayloadAction<ITemplate>) => {
      state.templateSaving = false;
      state.templates!.ids.push(payload.id);
      state.templates!.values[payload.id] = payload;
    },
    createTemplateFailure: (state, { payload }: PayloadAction<ErrorRes>) => {
      state.templateSaving = false;
      state.templateSavingErrors = payload;
    },
  },
  extraReducers: {
    "user/loadCache": (
      state,
      { payload: { cache } }: PayloadAction<{ key: string; cache?: RootState }>
    ) => {
      if (cache) {
        Object.entries(cache.templates).forEach(([k, v]) => {
          (state as any)[k] = v;
        });
      }
    },
  },
});

export const { selectTemplate } = templateSlice.actions;
