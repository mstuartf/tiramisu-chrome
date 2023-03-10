import { combineReducers } from "@reduxjs/toolkit";
import { promptSlice } from "./slice";

export const rootReducer = combineReducers({
  prompts: promptSlice.reducer,
});
