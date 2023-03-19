export const sectionTypes: {
  name: string;
  description: string;
  metaRequired?: boolean;
  metaPlaceholder?: string;
}[] = [
  {
    name: "profile_observation",
    description: "Comment the recipient's profile",
  },
  {
    name: "profile_question",
    description: "Ask a question about the recipient's profile",
  },
  {
    name: "company_intro",
    description: "Introduce a company",
    metaRequired: true,
    metaPlaceholder: "Describe the company (required)",
  },
  {
    name: "product_intro",
    description: "Introduce a product/service",
    metaRequired: true,
    metaPlaceholder: "Describe the product/service (required)",
  },
  {
    name: "call_to_action",
    description: "Call to action",
    metaRequired: true,
    metaPlaceholder: "Describe the call to action (required)",
  },
  {
    name: "custom",
    description: "Custom",
    metaRequired: true,
    metaPlaceholder: "Describe the section (required)",
  },
];

export const templateStyles: {
  name: string;
  description: string;
  metaRequired?: boolean;
  metaPlaceholder?: string;
}[] = [
  {
    name: "informal",
    description: "Cheeky and informal",
  },
  {
    name: "professional",
    description: "Polite and professional",
  },
  {
    name: "custom",
    description: "Custom style",
    metaRequired: true,
    metaPlaceholder: "Describe the message style (required)",
  },
];
