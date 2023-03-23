export interface State {
  isLoadingProfile: boolean;
  profile?: LinkedInProfile;
  profileError?: number;
  isLoadingMessages: boolean;
  messages?: MessageSet;
  messagesError?: number;
  messagesLoadingPercent?: number;
}

export interface LinkedInProfile {
  full_name: string;
  headline: string;
  summary?: string;
  talks_about?: string;
  slug: string;
  profile_pic_url?: string;
}

export interface Message {
  id: string;
  text: string;
}

export interface MessageSet {
  id: string;
  processed: boolean;
  messages: Message[];
}
