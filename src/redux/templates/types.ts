export interface Template {
  id: string;
  name: string;
  text: string;
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
