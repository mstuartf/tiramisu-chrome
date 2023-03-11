import { createRequestAction } from "../middleware/_api";
import { ListPromptsRes, Prompt } from "./types";

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
            id: "abc6",
            custom: true,
            name: "Wacky",
            text: "Wacky prompt text",
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

export const createPatchPrompt = createRequestAction<Prompt>(
  `prompts/patchPrompt`,
  (id: string, payload: Partial<Prompt>) => ({
    url: `prompts/${id}`,
    method: "PATCH",
    payload,
    mockData: {
      status: 200,
      body: {
        id,
        custom: true,
        name: "Updated header",
        text: "Updated text",
      },
    },
  })
);

export const createDeletePrompt = createRequestAction<null>(
  `prompts/deletePrompt`,
  (id: string) => ({
    url: `prompts/${id}`,
    method: "DELETE",
    mockData: {
      status: 204,
      body: null,
    },
  })
);
