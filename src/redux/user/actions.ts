import { createRequestAction } from "../middleware/_api";
import { User } from "./types";

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

export const createFetchUser = createRequestAction<User>(
  `user/fetchUser`,
  () => ({
    url: `user/me`,
    authenticated: true,
    mockData: {
      status: 200,
      body: {
        id: "asldkjhasldfks",
        admin: true,
      },
    },
  })
);

export const createInviteUser = createRequestAction<null>(
  `user/inviteUser`,
  (payload: { email: string }) => ({
    url: `user/invite`,
    authenticated: true,
    method: "POST",
    payload,
    mockData: {
      status: 204,
      body: null,
    },
  })
);
