import { applyMiddleware, Store } from "webext-redux";
import * as redux from "redux";
import { loggerMiddleware } from "./middleware/logger";
import { apiMiddleware } from "./middleware/api";
import { cacheMiddleware } from "./middleware/cache";

const proxyStore = new Store();

const middleware: redux.Middleware[] = [
  loggerMiddleware,
  apiMiddleware,
  cacheMiddleware,
];

const withMiddleware = applyMiddleware(proxyStore, ...middleware);

export default withMiddleware;
