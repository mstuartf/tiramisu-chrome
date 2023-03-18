export interface ITemplateSection {
  id: string;
  content: string;
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
  templateSaving: boolean;
  templateSavingErrors: TemplateSaveErrors[];
  selectedTemplate?: string;
}

export interface TemplateSaveErrors {
  description: string;
}
