import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { State as UserState } from "./user/types";
import { State as TemplatesState } from "./templates/types";
import { State as ProspectState } from "./prospect/types";

export type RootState = {
  user: UserState;
  templates: TemplatesState;
  prospect: ProspectState;
};

export const store = configureStore({
  reducer: rootReducer,
});
