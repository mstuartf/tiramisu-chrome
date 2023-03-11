import { createRequestAction } from "../middleware/_api";

export const createLoginRequest = createRequestAction<{ token: string }>(
  `user/login`,
  (payload: { email: string; password: string }) => ({
    url: `auth/`,
    method: "POST",
    payload,
    mockData: {
      status: 200,
      body: {
        token: "asldkjhasldfks",
      },
    },
  })
);
