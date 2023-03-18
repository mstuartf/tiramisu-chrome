export const sectionTypes: {
  name: string;
  description: string;
  metaRequired?: boolean;
  metaPlaceholder?: string;
}[] = [
  {
    name: "profile_observation",
    description: "Make an observation about the recipient's profile",
  },
  {
    name: "profile_question",
    description: "Ask a question about the recipient's profile",
  },
  {
    name: "product_intro",
    description: "Introduce a company or product",
    metaRequired: true,
    metaPlaceholder: "Describe the company or product (required)",
  },
  {
    name: "call_to_action",
    description: "Call to action",
    metaRequired: true,
    metaPlaceholder: "Describe the call to action (required)",
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
