export interface State {
  user?: User;
  token?: string | null;
  loginPending: boolean;
  userLoading: boolean;
  teamLoading: boolean;
  team?: {
    ids: string[];
    values: {
      [id: string]: User;
    };
  };
  invitePending: boolean;
}

export interface User {
  id: string;
  admin: boolean;
  email: string;
  company: string;
}

export type ListUsersRes = User[];
