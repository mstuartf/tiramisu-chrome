export interface Prompt {
  id: string;
  name: string;
  text: string;
  custom: boolean;
}

export interface ListPromptsRes {
  results: Prompt[];
}

export interface State {
  promptsLoading: boolean;
  prompts?: Prompt[];
}
