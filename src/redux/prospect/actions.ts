import { createRequestAction } from "../middleware/_api";
import { LinkedInProfile, MessageSet } from "./types";

export const createFetchProspectProfile = createRequestAction<LinkedInProfile>(
  `prospect/fetchProspectProfile`,
  (slug: string) => ({
    url: `prospect/profile/${slug}`,
    mockData: {
      status: 200,
      body: {
        id: "abc123",
        first_name: "Mike",
        last_name: "Flood",
        headline: "Software Engineer at News UK",
        summary: "blah blah",
      },
    },
  })
);

export const createGenerateMessages = createRequestAction<MessageSet>(
  `prospect/generateMessages`,
  (profileId: string, promptId: string) => ({
    url: `prospect/generate/${profileId}/prompt/${promptId}`,
    mockData: {
      status: 200,
      body: {
        id: "abc123",
        promptId: "asdfasdf",
        prospectId: "asdgasdgsd",
        messages: [
          {
            text: "1. Wow - two digital banks in 2021 and 2022? That's some serious hustle!",
          },
          {
            text: "2. So, I hear you like to take on big challenges?",
          },
          {
            text: "3. You must be an expert on financial regulations after all that experience in risk management!",
          },
          {
            text: "4. I'm impressed by your ability to build high performing teams. Any tips you can share?",
          },
          {
            text: "5. Looks like you know how to make the most of a LinkedIn profile!",
          },
        ],
      },
    },
  })
);
