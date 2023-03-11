import { combineReducers } from "@reduxjs/toolkit";
import { promptSlice } from "./prompts/slice";
import { prospectSlice } from "./prospect/slice";
import { userSlice } from "./user/slice";

export const rootReducer = combineReducers({
  prompts: promptSlice.reducer,
  prospect: prospectSlice.reducer,
  user: userSlice.reducer,
});
