import { combineReducers } from "@reduxjs/toolkit";
import { promptSlice } from "./prompts/slice";
import { prospectSlice } from "./prospect/slice";

export const rootReducer = combineReducers({
  prompts: promptSlice.reducer,
  prospect: prospectSlice.reducer,
});
