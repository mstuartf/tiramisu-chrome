import { applyMiddleware, Store } from "webext-redux";
import * as redux from "redux";
import { loggerMiddleware } from "./middleware/logger";
import { apiMiddleware } from "./middleware/api";
import { cacheMiddleware } from "./middleware/cache";
import { refreshMiddleware } from "./middleware/refresh";

const proxyStore = new Store();

const middleware: redux.Middleware[] = [
  refreshMiddleware,
  loggerMiddleware,
  apiMiddleware,
  cacheMiddleware,
];

const withMiddleware = applyMiddleware(proxyStore, ...middleware);

export default withMiddleware;
