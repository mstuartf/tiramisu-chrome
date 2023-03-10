import {
  createFailureAction,
  createPendingAction,
  createSuccessAction,
} from "./actionCreators";
import {
  ApiMiddlewareResponseHandler,
  IArgs,
  IRequestConfig,
  JsonLdr,
} from "./types";
import { AnyAction, MiddlewareAPI } from "redux";

export const mockApiCall = async (
  action: AnyAction,
  store: MiddlewareAPI,
  request: IRequestConfig,
  options: {
    customHandlers?: ApiMiddlewareResponseHandler[];
    jsonLdr?: JsonLdr;
    mockRequestDuration?: number;
  }
) => {
  store.dispatch(createPendingAction(action.type, request));

  const duration: number = options.mockRequestDuration || 1000;

  if ("json" in request.mockData!) {
    if (!options.jsonLdr) {
      throw Error(
        `mockData for action ${action.type} has json response but no jsonLdr is specified in buildApiMiddleware options`
      );
    }
    await options.jsonLdr(request.mockData.json).then((response) => {
      setTimeout(() => {
        store.dispatch(
          createSuccessAction(action.type, response.default, request, 200)
        );
      }, duration);
    });
  } else {
    const { status, body } = request.mockData!;
    setTimeout(() => {
      handleMockResponse(
        { action, status, body, store, request },
        options.customHandlers
      );
    }, duration);
  }
};

const handleMockResponse = (
  args: IArgs,
  customHandlers?: ApiMiddlewareResponseHandler[]
) => {
  // custom handlers take priority
  let customHandlerMatch = false;
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

  const { action, status, body, store, request } = args;
  if (args.status < 400) {
    store.dispatch(
      createSuccessAction(action.type, body, request, args.status)
    );
  } else {
    store.dispatch(createFailureAction(action.type, status, body, request));
  }
};
