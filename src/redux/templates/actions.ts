import { createRequestAction } from "../middleware/_api";
import { ListTemplatesRes, ITemplate, INewTemplate } from "./types";

export const createListTemplates = createRequestAction<ListTemplatesRes>(
  `templates/listTemplates`,
  () => ({
    url: `templates`,
    authenticated: true,
    mockData: {
      status: 200,
      body: [
        {
          id: "abc123",
          name: "Funny",
          style: "informal",
          sections: [
            {
              id: "s21",
              order: 0,
              content: "profile_observation",
            },
          ],
        },
        {
          id: "abc6",
          name: "Risky",
          style: "custom",
          meta: "sarcastic",
          sections: [
            {
              id: "s21",
              order: 0,
              content: "profile_observation",
            },
          ],
        },
        {
          id: "abc456",
          name: "Serious",
          style: "professional",
          sections: [],
        },
      ],
    },
  })
);

export const createPutTemplate = createRequestAction<Partial<ITemplate>>(
  `templates/putTemplate`,
  (id: string, payload: ITemplate) => ({
    url: `templates/${id}`,
    authenticated: true,
    method: "PUT",
    payload,
    mockData: {
      status: 200,
      body: {
        ...payload,
      },
    },
  })
);

export const createDeleteTemplate = createRequestAction<null>(
  `templates/deleteTemplate`,
  (id: string) => ({
    authenticated: true,
    url: `templates/${id}`,
    method: "DELETE",
    mockData: {
      status: 204,
      body: null,
    },
  })
);

export const createCreateTemplate = createRequestAction<ITemplate>(
  `templates/createTemplate`,
  (payload: INewTemplate) => ({
    url: `templates`,
    authenticated: true,
    method: "POST",
    payload,
    mockData: {
      status: 204,
      body: {
        id: "new123",
        ...payload,
        sections: payload.sections.map((section, index) => ({
          id: `${index}`,
          ...section,
        })),
      },
    },
  })
);
