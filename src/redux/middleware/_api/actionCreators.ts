import {
  IPendingAction,
  IRequestConfig,
  IResponseAction,
  IUniformRequestAction,
} from "./types";

export const createRequestAction: <R, P = undefined, T extends any[] = any[]>(
  type: string,
  buildRequestConfig: (...args: T) => IRequestConfig<R, P>
) => (...args: T) => IUniformRequestAction<R, P> = (
  type,
  buildRequestConfig
) => {
  return (...args) => ({
    type,
    meta: {
      request: buildRequestConfig(...args),
    },
  });
};

export const createPendingAction: (
  initialType: string,
  originalRequest: IRequestConfig
) => IPendingAction = (initialType, originalRequest) => ({
  type: `${initialType}Pending`,
  meta: {
    originalRequest,
  },
});

export const createSuccessAction: (
  initialType: string,
  responseJson: any,
  originalRequest: IRequestConfig,
  status: number
) => IResponseAction = (
  initialType,
  responseJson,
  originalRequest,
  status
) => ({
  type: `${initialType}Success`,
  payload: responseJson,
  meta: {
    originalRequest,
    status,
  },
});

export const createFailureAction: (
  initialType: string,
  status: number,
  body: any,
  originalRequest: IRequestConfig
) => IResponseAction = (initialType, status, body, originalRequest) => ({
  type: `${initialType}Failure`,
  payload: { status, body },
  meta: {
    originalRequest,
  },
});

export const createPartialSuccessAction: (
  initialType: string,
  responseJson: any,
  originalRequest: IRequestConfig,
  status: number
) => IResponseAction = (
  initialType,
  responseJson,
  originalRequest,
  status
) => ({
  type: `${initialType}PartialSuccess`,
  payload: responseJson,
  meta: {
    originalRequest,
    status,
  },
});
