import { createRequestAction } from "../middleware/_api";
import { LinkedInProfile } from "./types";

export const createFetchProspectProfile = createRequestAction<LinkedInProfile>(
  `prospect/fetchProspectProfile`,
  (slug: string) => ({
    url: `prospect/profile/${slug}`,
    mockData: {
      status: 200,
      body: {
        first_name: "Mike",
        last_name: "Flood",
        headline: "Software Engineer at News UK",
        summary: "blah blah",
      },
    },
  })
);
