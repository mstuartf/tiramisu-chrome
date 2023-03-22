import { combineReducers } from "@reduxjs/toolkit";
import { templateSlice } from "./templates/slice";
import { prospectSlice } from "./prospect/slice";
import { userSlice } from "./user/slice";
import { RootState } from "./store";
import { AnyAction } from "redux";

const appReducer = combineReducers({
  templates: templateSlice.reducer,
  prospect: prospectSlice.reducer,
  user: userSlice.reducer,
});

export const rootReducer = (
  state: RootState | undefined,
  action: AnyAction
) => {
  if (action.type === "user/logout") {
    const cacheKey = state?.user.cacheKey;
    const { user, ...rest } = appReducer(undefined, action);
    return {
      user: {
        ...user,
        cacheKey,
      },
      ...rest,
    };
  }
  return appReducer(state, action);
};
