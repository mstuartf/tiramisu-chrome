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
            id: "1",
            text: "Wow - two digital banks in 2021 and 2022? That's some serious hustle!",
          },
          {
            id: "2",
            text: "So, I hear you like to take on big challenges?",
          },
          {
            id: "3",
            text: "You must be an expert on financial regulations after all that experience in risk management!",
          },
          {
            id: "4",
            text: "I'm impressed by your ability to build high performing teams. Any tips you can share?",
          },
          {
            id: "5",
            text: "Looks like you know how to make the most of a LinkedIn profile!",
          },
        ],
      },
    },
  })
);

export const createRecordCopy = createRequestAction<null>(
  `prospect/recordCopy`,
  (msgId: string) => ({
    url: `prospect/message/${msgId}`,
    method: "PATCH",
    payload: {
      copied: true,
    },
    mockData: {
      status: 200,
      body: null,
    },
  })
);
