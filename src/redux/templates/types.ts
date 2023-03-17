export interface TemplateSection {
  id: string;
  content: string;
  meta?: string;
}

export interface Template {
  id: string;
  name: string;
  style: string;
  sections: TemplateSection[];
  custom: boolean;
}

export type ListTemplatesRes = Template[];

export interface State {
  templatesLoading: boolean;
  templates?: {
    ids: string[];
    values: {
      [id: string]: Template;
    };
  };
  templateSaving: boolean;
  selectedTemplate?: string;
}
