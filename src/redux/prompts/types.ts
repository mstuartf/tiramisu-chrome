export interface Prompt {
  id: string;
  name: string;
  text: string;
  custom: boolean;
}

export type ListPromptsRes = Prompt[];

export interface State {
  promptsLoading: boolean;
  prompts?: {
    ids: string[];
    values: {
      [id: string]: Prompt;
    };
  };
  promptSaving: boolean;
  selectedPrompt?: string;
}
