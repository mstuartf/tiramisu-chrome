import * as redux from "redux";

export const msgMiddleware: redux.Middleware =
  (store) => (next) => (action) => {
  console.log(action);
    next(action);
  };
