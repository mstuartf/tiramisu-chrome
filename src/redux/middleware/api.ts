import { buildApiMiddleware } from "./_api";
import { RootState } from "../store";

export const apiMiddleware = buildApiMiddleware(
  // @ts-ignore
  () => process.env.REACT_APP_BACKEND_URL,
  (store) => {
    const state = store.getState() as RootState;
    return {
      Authorization: `Bearer ${state.user.auth?.access}`,
    };
  },
  {
    // useMocksWhen: () => true,
    appendSlash: true,
  }
);
