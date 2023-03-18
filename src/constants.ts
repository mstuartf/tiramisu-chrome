export const sectionTypes: {
  name: string;
  description: string;
  metaRequired: boolean;
}[] = [
  {
    name: "profile_observation",
    description: "Make an observation about the recipient's profile",
    metaRequired: false,
  },
  {
    name: "profile_question",
    description: "Ask a question about the recipient's profile",
    metaRequired: false,
  },
  {
    name: "product_intro",
    description: "Introduce a company's product or service",
    metaRequired: true,
  },
  {
    name: "call_to_action",
    description: "Call to action",
    metaRequired: true,
  },
];

export const templateStyles: {
  name: string;
  description: string;
  metaRequired: boolean;
}[] = [
  {
    name: "informal",
    description: "Cheeky and informal",
    metaRequired: false,
  },
  {
    name: "professional",
    description: "Polite and professional",
    metaRequired: false,
  },
  {
    name: "custom",
    description: "Custom style",
    metaRequired: true,
  },
];
