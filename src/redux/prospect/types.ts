import { Link } from "react-router-dom";

export interface State {
  profileSlug?: string;
  isLoadingProfile: boolean;
  profile?: LinkedInProfile;
}

export interface LinkedInProfile {
  first_name: string;
  last_name: string;
  headline: string;
  summary: string;
}
