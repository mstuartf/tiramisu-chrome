import * as redux from "redux";
import { deleteToken, saveToken } from "../../cache";
import { logout } from "../user/slice";

export const cacheMiddleware: redux.Middleware =
  (store) => (next) => (action) => {
    if (action.type === "user/loginSuccess") {
      saveToken(action.payload.access);
    }
    if (action.type === "user/logout") {
      deleteToken();
    }
    if (action.type.includes("Failure") && action.payload.status === 401) {
      store.dispatch(logout());
    }
    next(action);
  };
