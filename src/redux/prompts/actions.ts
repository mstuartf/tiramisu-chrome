import { createRequestAction } from "../middleware/_api";
import { ListPromptsRes } from "./types";

export const createListPrompts = createRequestAction<ListPromptsRes>(
  `prompts/listPrompts`,
  () => ({
    url: `prompts`,
    mockData: {
      status: 200,
      body: {
        results: [
          {
            id: "abc123",
            custom: false,
            name: "Funny",
            text: "Funny prompt text",
          },
          {
            id: "abc456",
            custom: false,
            name: "Serious",
            text: "Serious prompt text",
          },
        ],
      },
    },
  })
);
