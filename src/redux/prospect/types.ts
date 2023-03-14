export interface State {
  isLoadingProfile: boolean;
  profile?: LinkedInProfile;
  profileError?: number;
  isLoadingMessages: boolean;
  messages?: MessageSet;
  messagesError?: number;
}

export interface LinkedInProfile {
  full_name: string;
  headline: string;
  summary: string;
  talks_about: string;
  slug: string;
}

export interface Message {
  id: string;
  text: string;
}

export interface MessageSet {
  id: string;
  messages: Message[];
}
