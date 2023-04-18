export interface Msg {
  type: string;
}

export interface LinkedInMsg extends Msg {
  profile_name: string;
  profile_slug: string;
  content: string;
}

export interface SendMsgRes<T = string> {
  success: boolean;
  detail: T;
}
