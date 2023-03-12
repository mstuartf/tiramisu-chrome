export interface State {
  user?: User;
  token?: string | null;
  loginPending: boolean;
  userLoading: boolean;
}

export interface User {
  id: string;
  admin: boolean;
}
