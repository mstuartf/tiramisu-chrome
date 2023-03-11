export interface State {
  profileSlug?: string;
  isLoadingProfile: boolean;
  profile?: LinkedInProfile;
  profileError?: string;
  isLoadingMessages: boolean;
  messages?: MessageSet;
}

export interface LinkedInProfile {
  id: string;
  first_name: string;
  last_name: string;
  headline: string;
  summary: string;
}

export interface MessageSet {
  id: string;
  prospectId: string;
  promptId: string;
  messages: { text: string }[];
}
