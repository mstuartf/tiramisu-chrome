import { stringify } from "query-string";
import { IRequestConfig } from "./types";

const buildRequestURL = (
  baseUrl: string,
  { url, params }: IRequestConfig,
  appendSlash?: boolean
): string => {
  const base = url.indexOf("http") < 0 ? `${baseUrl}/` : "";
  return `${base}${url}${appendSlash && url.slice(-1) !== "/" ? "/" : ""}${
    params ? "?" + stringify(params) : ""
  }`;
};

export default buildRequestURL;
