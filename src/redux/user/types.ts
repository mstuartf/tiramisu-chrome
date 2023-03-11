export interface State {
  user?: User;
  token?: string | null;
  loginPending: boolean;
}

export interface User {
  id: string;
}
