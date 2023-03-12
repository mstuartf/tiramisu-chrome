import { createRequestAction } from "../middleware/_api";
import { ListUsersRes, User } from "./types";

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
        email: "test@mike.com",
      },
    },
  })
);

export const createListTeam = createRequestAction<ListUsersRes>(
  `user/listTeam`,
  () => ({
    url: `user/list`,
    authenticated: true,
    mockData: {
      status: 200,
      body: {
        results: [
          {
            id: "1",
            email: "test@1.com",
            admin: false,
          },
          {
            id: "2",
            email: "test@2.com",
            admin: false,
          },
        ],
      },
    },
  })
);

export const createInviteUser = createRequestAction<User>(
  `user/inviteUser`,
  (payload: { email: string; admin: boolean }) => ({
    url: `user/invite`,
    authenticated: true,
    method: "POST",
    payload,
    mockData: {
      status: 200,
      body: {
        id: "asdjkfhasf",
        ...payload,
      },
    },
  })
);
