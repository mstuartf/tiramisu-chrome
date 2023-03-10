import { buildApiMiddleware } from "./_api";

export const apiMiddleware = buildApiMiddleware(
  // @ts-ignore
  () => process.env.REACT_APP_BACKEND_URL,
  () => {},
  {
    useMocksWhen: () => true,
    appendSlash: true,
  }
);
