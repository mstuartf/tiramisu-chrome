import { AnyAction, MiddlewareAPI } from "redux";

export interface IMockRequestData<R> {
  status: number;
  body: R;
}

export type requestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ParsedQuery {
  [key: string]: string | string[] | null | undefined | number | number[];
}

export type IFullRequestConfig<R = any> = {
  url: string;
  method?: requestMethod;
  authenticated?: boolean;
  params?: ParsedQuery;
  mockData?: { json: string } | IMockRequestData<R>;
  headers?: HeadersInit;
};

export type IRequestConfig<R = any, P = any> = P extends undefined
  ? IFullRequestConfig<R>
  : IFullRequestConfig<R> & { payload: P };

export interface IPendingAction<R = any, P = undefined> {
  type: string;
  meta: {
    originalRequest: IRequestConfig<R, P>;
  };
}

export interface IResponseAction<R = any, P = undefined> {
  payload: R;
  type: string;
  meta: {
    originalRequest: IRequestConfig<R, P>;
  };
}

export interface IArgs {
  action: AnyAction;
  status: number;
  body: any;
  store: MiddlewareAPI;
  request: IRequestConfig;
}

export interface IUniformRequestAction<R = any, P = any> {
  type: string;
  meta: {
    request: IRequestConfig<R, P>;
  };
}

export interface ApiMiddlewareResponseHandler {
  matcher: (args: Partial<IArgs>) => boolean;
  handler: (args: Partial<IArgs>) => void;
}

export type AuthHeaderBuilder = (store: MiddlewareAPI) => {
  [header: string]: string;
};

export type AsyncAuthHeaderBuilder = (store: MiddlewareAPI) => Promise<{
  [header: string]: string;
}>;

export type URLBuilder = () => string;

export type UseMocksChecker = () => boolean;

export type JsonLdr = (path: string) => Promise<{ default: any }>;

// These types allow you to infer the SuccessAction/PendingAction type from the request action creator function.
// This means that the types should always align.

export type InferResponse<S> = S extends IUniformRequestAction<infer R, infer P>
  ? R
  : never;

export type InferPayload<S> = S extends IUniformRequestAction<infer R, infer P>
  ? P
  : never;

export type SuccessAction<A extends (args: any) => IUniformRequestAction> =
  IResponseAction<InferResponse<ReturnType<A>>, InferPayload<ReturnType<A>>>;

export type PendingAction<A extends (args: any) => IUniformRequestAction> =
  IPendingAction<InferResponse<ReturnType<A>>, InferPayload<ReturnType<A>>>;
