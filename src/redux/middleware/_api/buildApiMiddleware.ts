import {
  createFailureAction,
  createPendingAction,
  createSuccessAction,
} from "./actionCreators";
import {
  ApiMiddlewareResponseHandler,
  AsyncAuthHeaderBuilder,
  AuthHeaderBuilder,
  IUniformRequestAction,
  JsonLdr,
  URLBuilder,
  UseMocksChecker,
} from "./types";
import buildRequestURL from "./buildRequestURL";
import { buildOnSuccessHandler } from "./buildOnSuccessHandler";
import { buildOnErrorHandler } from "./buildOnErrorHandler";
import buildRequestInit from "./buildRequestInit";
import { Middleware } from "redux";
import { mockApiCall } from "./mockApiCall";

function isPromise(
  obj: Promise<any> | { [header: string]: string }
): obj is Promise<any> {
  return (obj as Promise<any>).then !== undefined;
}

export const buildApiMiddleware = (
  urlBuilder: URLBuilder,
  authHeaderBuilder: AuthHeaderBuilder | AsyncAuthHeaderBuilder,
  options?: {
    customHandlers?: ApiMiddlewareResponseHandler[];
    useMocksWhen?: UseMocksChecker;
    jsonMocksLdr?: JsonLdr;
    mockRequestDuration?: number;
    appendSlash?: boolean;
  }
) => {
  const middleware: Middleware = (store) => (next) => async (action) => {
    next(action);

    // ignore this action if it has no request config
    if (!action.meta || !action.meta.request) {
      return;
    }

    const {
      meta: { request },
    } = action as IUniformRequestAction;

    const useMocks = options?.useMocksWhen && options.useMocksWhen();
    const customHandlers = options?.customHandlers;

    if (request.mockData && useMocks) {
      await mockApiCall(action, store, request, {
        customHandlers,
        jsonLdr: options?.jsonMocksLdr,
        mockRequestDuration: options?.mockRequestDuration,
      });
      return;
    }

    const baseUrl = urlBuilder();
    const requestUrl = buildRequestURL(baseUrl, request, options?.appendSlash);

    const { authenticated = false } = request;
    let authHeader;
    if (authenticated) {
      const buildAuthHeader = authHeaderBuilder(store);
      if (isPromise(buildAuthHeader)) {
        authHeader = await buildAuthHeader;
      } else {
        authHeader = buildAuthHeader;
      }
    }
    const requestInit = buildRequestInit(request, authHeader);

    store.dispatch(createPendingAction(action.type, request));

    await fetch(requestUrl, requestInit)
      .then((response: Response) =>
        response
          .json()
          .then(
            buildOnSuccessHandler(
              action,
              response.status,
              store,
              request,
              customHandlers
            )
          )
          .catch(
            buildOnErrorHandler(
              action,
              response.status,
              store,
              request,
              customHandlers
            )
          )
      )
      .catch((e) =>
        store.dispatch(
          createFailureAction(action.type, 0, e.toString(), request)
        )
      );
  };
  return middleware;
};
