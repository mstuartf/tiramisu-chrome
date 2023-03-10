import { IFullRequestConfig, IRequestConfig } from "./types";

function hasPayload(
  config: IFullRequestConfig | (IFullRequestConfig & { payload: any })
): config is IFullRequestConfig & { payload: any } {
  return (
    (config as IFullRequestConfig & { payload: any }).payload !== undefined
  );
}

function dataURLtoBlob(dataUri: string) {
  let arr = dataUri.split(","),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const buildRequestInit = (
  request: IRequestConfig,
  authHeader?: { [header: string]: string }
): RequestInit => {
  const { method = "GET" } = request;
  let { headers } = request;

  headers = (
    headers !== undefined ? headers : { "Content-Type": "application/json" }
  ) as Record<string, string>;

  let payload: string | undefined | FormData;
  if (hasPayload(request)) {
    payload = request.payload;
    if (request.payload.preSignedUrl) {
      const file = dataURLtoBlob(request.payload.dataUri);
      payload = new FormData();
      Object.keys(request.payload.preSignedUrl.fields).forEach((key) => {
        (payload as FormData).append(
          key,
          request.payload.preSignedUrl.fields[key]
        );
      });
      payload.append("file", file);
      // DO NOT SET HEADERS WHEN SENDING FORM DATA
      headers = {};
    } else if (headers["Content-Type"] === "application/json") {
      payload = JSON.stringify(request.payload);
    }
  }

  return {
    method,
    headers: {
      ...headers,
      ...(authHeader ? authHeader : {}),
    },
    ...(payload ? { body: payload } : {}),
  };
};

export default buildRequestInit;
