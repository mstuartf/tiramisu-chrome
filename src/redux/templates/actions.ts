import { createRequestAction } from "../middleware/_api";
import { ListTemplatesRes, ITemplate } from "./types";

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
          custom: false,
          name: "Funny",
          style: "informal",
          sections: [
            {
              id: "s21",
              content: "blah",
            },
          ],
        },
        {
          id: "abc6",
          custom: true,
          name: "Risky",
          style: "informal",
          sections: [],
        },
        {
          id: "abc456",
          custom: false,
          name: "Serious",
          style: "informal",
          sections: [],
        },
      ],
    },
  })
);

export const createPatchTemplate = createRequestAction<Partial<ITemplate>>(
  `templates/patchTemplate`,
  (id: string, payload: Partial<ITemplate>) => ({
    url: `templates/${id}`,
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
  (payload: Omit<ITemplate, "id" | "custom">) => ({
    url: `templates`,
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
