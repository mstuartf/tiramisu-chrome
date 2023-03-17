export interface ITemplateSection {
  id: string;
  content: string;
  meta?: string;
}

export interface ITemplate {
  id: string;
  name: string;
  style: string;
  sections: ITemplateSection[];
  custom: boolean;
}

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
  selectedTemplate?: string;
}
