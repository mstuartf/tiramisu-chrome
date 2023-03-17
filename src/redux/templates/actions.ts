import { createRequestAction } from "../middleware/_api";
import { ListTemplatesRes, Template } from "./types";

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
          sections: [],
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

export const createPatchTemplate = createRequestAction<Partial<Template>>(
  `templates/patchTemplate`,
  (id: string, payload: Partial<Template>) => ({
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

export const createCreateTemplate = createRequestAction<Template>(
  `templates/createTemplate`,
  (payload: Omit<Template, "id" | "custom">) => ({
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
