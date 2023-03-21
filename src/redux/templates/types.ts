import { ErrorRes } from "../types";

export interface ITemplateSection {
  id: string;
  type: string;
  order: number;
  meta?: string;
}

export type INewTemplateSection = Omit<ITemplateSection, "id">;

export interface ITemplate {
  id: string;
  name: string;
  style: string;
  sections: ITemplateSection[];
  meta?: string;
  shared?: boolean;
}

export type INewTemplate = Omit<ITemplate, "id" | "sections" | "custom"> & {
  sections: INewTemplateSection[];
};

export type ListTemplatesRes = ITemplate[];

export interface State {
  templatesLoading: boolean;
  templates?: {
    ids: string[];
    values: {
      [id: string]: ITemplate;
    };
  };
  templateStylesLoading: boolean;
  templateStyles?: {
    ids: string[];
    values: {
      [id: string]: ITemplateStyle;
    };
  };
  templateSectionTypesLoading: boolean;
  templateSectionTypes?: {
    ids: string[];
    values: {
      [id: string]: ITemplateSectionType;
    };
  };
  templateSaving: boolean;
  templateSavingErrors?: ErrorRes;
  selectedTemplate?: string;
}

export interface ITemplateStyle {
  id: string;
  description: string;
  meta_required?: boolean;
  meta_placeholder?: string;
}

export interface ITemplateSectionType {
  id: string;
  description: string;
  meta_required?: boolean;
  meta_placeholder?: string;
}
