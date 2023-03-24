import * as redux from "redux";
import { AnyAction } from "redux";
import { createRefreshRequest } from "../user/actions";

export const refreshMiddleware: redux.Middleware = (store) => (next) => {
  const queuedRequests: AnyAction[] = [];
  return (action) => {
    if (
      action.meta?.request &&
      action.meta.request.authenticated &&
      action.type !== "user/refresh" &&
      store.getState().user.auth.exp - Date.now() / 1000 < 0
    ) {
      if (!queuedRequests.length) {
        store.dispatch(
          createRefreshRequest({ refresh: store.getState().user.auth.refresh })
        );
      }
      queuedRequests.push(action);
      return;
    }

    if (action.type === "user/refreshSuccess") {
      next(action);
      // use setTimeout to make sure store is updated with new token before resuming
      setTimeout(() => {
        while (queuedRequests.length) {
          const paused = queuedRequests.shift()!;
          next(paused);
        }
      }, 100);
      return;
    }

    next(action);
  };
};
