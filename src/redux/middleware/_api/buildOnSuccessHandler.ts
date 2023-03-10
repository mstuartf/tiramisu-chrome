import {
  createFailureAction,
  createPartialSuccessAction,
  createSuccessAction,
} from "./actionCreators";
import { ApiMiddlewareResponseHandler, IArgs, IRequestConfig } from "./types";
import { AnyAction, MiddlewareAPI } from "redux";

export const buildOnSuccessHandler =
  (
    action: AnyAction,
    status: number,
    store: MiddlewareAPI,
    request: IRequestConfig,
    customHandlers?: ApiMiddlewareResponseHandler[]
  ) =>
  (body: any) => {
    // custom handlers take priority
    let customHandlerMatch = false;
    const args: IArgs = { action, status, store, body, request };
    (customHandlers || []).forEach(({ matcher, handler }) => {
      if (!customHandlerMatch && matcher(args)) {
        customHandlerMatch = true;
        handler(args);
      }
    });

    // if a custom handler matched, skip default handler
    if (customHandlerMatch) {
      return;
    }

    // if no custom handler (or if none passed) matched proceed with default behaviour
    if (status < 400) {
      if (status === 207) {
        store.dispatch(
          createPartialSuccessAction(action.type, body, request, status)
        );
      } else {
        store.dispatch(createSuccessAction(action.type, body, request, status));
      }
    } else {
      store.dispatch(createFailureAction(action.type, status, body, request));
    }
  };
