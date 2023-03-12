import * as redux from "redux";
import { deleteToken, saveToken } from "../../cache";

export const cacheMiddleware: redux.Middleware =
  (store) => (next) => (action) => {
    if (action.type === "user/loginSuccess") {
      saveToken(action.payload.access);
    }
    if (action.type === "user/logout") {
      deleteToken();
    }
    next(action);
  };
