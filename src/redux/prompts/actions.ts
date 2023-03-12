import { createRequestAction } from "../middleware/_api";
import { ListPromptsRes, Prompt } from "./types";

export const createListPrompts = createRequestAction<ListPromptsRes>(
  `prompts/listPrompts`,
  () => ({
    url: `prompts`,
    authenticated: true,
    mockData: {
      status: 200,
      body: [
        {
          id: "abc123",
          custom: false,
          name: "Funny",
          text: "Weird, cheeky and informal statements or observations that contain some humour.",
        },
        {
          id: "abc6",
          custom: true,
          name: "Risky",
          text: "Wacky comments or observations.",
        },
        {
          id: "abc456",
          custom: false,
          name: "Serious",
          text: "Polite questions in a professional tone.",
        },
      ],
    },
  })
);

export const createPatchPrompt = createRequestAction<Partial<Prompt>>(
  `prompts/patchPrompt`,
  (id: string, payload: Partial<Prompt>) => ({
    url: `prompts/${id}`,
    authenticated: true,
    method: "PATCH",
    payload,
    mockData: {
      status: 200,
      body: {
        id,
        ...payload,
      },
    },
  })
);

export const createDeletePrompt = createRequestAction<null>(
  `prompts/deletePrompt`,
  (id: string) => ({
    authenticated: true,
    url: `prompts/${id}`,
    method: "DELETE",
    mockData: {
      status: 204,
      body: null,
    },
  })
);

export const createCreatePrompt = createRequestAction<Prompt>(
  `prompts/createPrompt`,
  (payload: Omit<Prompt, "id" | "custom">) => ({
    url: `prompts`,
    authenticated: true,
    method: "POST",
    payload,
    mockData: {
      status: 204,
      body: {
        id: "new123",
        custom: true,
        ...payload,
      },
    },
  })
);
