import { createFailureAction, createSuccessAction } from "./actionCreators";
import { ApiMiddlewareResponseHandler, IArgs, IRequestConfig } from "./types";
import { AnyAction, MiddlewareAPI } from "redux";

export const buildOnErrorHandler =
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

    store.dispatch(
      status === 204 // handle empty responses
        ? createSuccessAction(action.type, null, request, status)
        : createFailureAction(action.type, status, body, request)
    );
  };
