import { applyMiddleware, Store } from "webext-redux";
import * as redux from "redux";
import { loggerMiddleware } from "./middleware/logger";
import { apiMiddleware } from "./middleware/api";

const proxyStore = new Store();

const middleware: redux.Middleware[] = [loggerMiddleware, apiMiddleware];

const withMiddleware = applyMiddleware(proxyStore, ...middleware);

export default withMiddleware;
