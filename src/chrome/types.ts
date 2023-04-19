export interface Msg {
  type: string;
}

export interface LinkedInMsg extends Msg {
  profile_name: string;
  profile_slug: string;
  content: string;
}

export interface LinkedInLike extends Msg {
  profile_name: string;
  profile_slug: string;
  post_content: string;
}

export interface LinkedInComment extends Msg {
  profile_name: string;
  profile_slug: string;
  post_content: string;
}

export interface SendMsgRes<T = string> {
  success: boolean;
  detail: T;
}

export interface CheckAuthRes {
  auth: { access: string; refresh: string };
  linkedin_tracking_enabled?: boolean;
  msg_tracking_activated: boolean;
  like_tracking_activated: boolean;
  comment_tracking_activated: boolean;
}
