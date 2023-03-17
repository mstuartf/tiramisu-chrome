import { combineReducers } from "@reduxjs/toolkit";
import { templateSlice } from "./templates/slice";
import { prospectSlice } from "./prospect/slice";
import { userSlice } from "./user/slice";

export const rootReducer = combineReducers({
  templates: templateSlice.reducer,
  prospect: prospectSlice.reducer,
  user: userSlice.reducer,
});
