import * as redux from "redux";

export const loggerMiddleware: redux.Middleware =
  (store) => (next) => (action) => {
    console.log(action.type, action.payload);
    next(action);
  };
