export interface State {
  user?: User;
  auth?: {
    access: string;
    refresh: string;
    exp: number;
  };
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
  cacheKey?: string;
  path?: string;
}

export interface User {
  id: string;
  admin: boolean;
  email: string;
  company: string;
}

export type ListUsersRes = User[];
