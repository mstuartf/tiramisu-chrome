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

export type Model = "gpt-3.5-turbo" | "gpt-4";

export interface User {
  id: string;
  admin: boolean;
  email: string;
  company: string;

  // feature flags
  linkedin_tracking_enabled?: boolean;

  // account config
  msg_tracking_activated?: boolean;
  like_tracking_activated?: boolean;
  comment_tracking_activated?: boolean;
  openai_model: Model;
}

export type ListUsersRes = User[];
