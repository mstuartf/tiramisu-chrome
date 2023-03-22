import * as redux from "redux";
import { logout } from "../user/slice";

export const cacheMiddleware: redux.Middleware =
  (store) => (next) => (action) => {
    if (action.type.includes("Failure") && action.payload.status === 401) {
      store.dispatch(logout());
    }
    next(action);
  };
