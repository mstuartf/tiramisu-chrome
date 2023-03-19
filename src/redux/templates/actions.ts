import { createRequestAction } from "../middleware/_api";
import {
  ListTemplatesRes,
  ITemplate,
  INewTemplate,
  ITemplateStyle,
  ITemplateSectionType,
} from "./types";

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

export const createListTemplateStyles = createRequestAction<ITemplateStyle[]>(
  `templates/listTemplateStyles`,
  () => ({
    url: `templates`,
    authenticated: true,
    mockData: {
      status: 200,
      body: [
        {
          id: "informal",
          description: "Cheeky and informal",
        },
        {
          id: "professional",
          description: "Polite and professional",
        },
        {
          id: "custom",
          description: "Custom style",
          metaRequired: true,
          metaPlaceholder: "Describe the message style (required)",
        },
      ],
    },
  })
);

export const createListTemplateSectionTypes = createRequestAction<
  ITemplateSectionType[]
>(`templates/listTemplateSectionTypes`, () => ({
  url: `templates`,
  authenticated: true,
  mockData: {
    status: 200,
    body: [
      {
        id: "profile_observation",
        description: "Comment the recipient's profile",
      },
      {
        id: "profile_question",
        description: "Ask a question about the recipient's profile",
      },
      {
        id: "company_intro",
        description: "Introduce a company",
        metaRequired: true,
        metaPlaceholder: "Describe the company (required)",
      },
      {
        id: "product_intro",
        description: "Introduce a product/service",
        metaRequired: true,
        metaPlaceholder: "Describe the product/service (required)",
      },
      {
        id: "call_to_action",
        description: "Call to action",
        metaRequired: true,
        metaPlaceholder: "Describe the call to action (required)",
      },
      {
        id: "custom",
        description: "Custom",
        metaRequired: true,
        metaPlaceholder: "Describe the section (required)",
      },
    ],
  },
}));

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
