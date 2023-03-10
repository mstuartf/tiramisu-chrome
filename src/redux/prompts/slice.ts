import { createSlice } from "@reduxjs/toolkit";

export const promptSlice = createSlice({
  name: "prompts",
  initialState: {
    templates: [
      {name: 'funny'},
      {name: 'serious'},
    ]
  },
  reducers: {},
});

export const {} = promptSlice.actions;
