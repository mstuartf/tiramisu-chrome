export interface State {
  profileSlug?: string;
  isLoadingProfile: boolean;
  profile?: LinkedInProfile;
  profileError?: number;
  isLoadingMessages: boolean;
  messages?: MessageSet;
  messagesError?: number;
}

export interface LinkedInProfile {
  id: string;
  first_name: string;
  last_name: string;
  headline: string;
  summary: string;
}

export interface Message {
  id: string;
  text: string;
}

export interface MessageSet {
  id: string;
  prospectId: string;
  promptId: string;
  messages: Message[];
}
