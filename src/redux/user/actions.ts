import { createRequestAction } from "../middleware/_api";
import { ListUsersRes, User } from "./types";

export const createRefreshRequest = createRequestAction<{
  access: string;
  refresh: string;
}>(`user/refresh`, (payload: { refresh: string }) => ({
  url: `auth/token/refresh`,
  method: "POST",
  payload,
  mockData: {
    status: 200,
    body: {
      access: "asldkjhasldfks",
      refresh: "asldkjhasldfks",
    },
  },
}));

export const createLoginRequest = createRequestAction<{
  access: string;
  refresh: string;
}>(`user/login`, (payload: { email: string; password: string }) => ({
  url: `auth/token`,
  method: "POST",
  payload,
  mockData: {
    status: 200,
    body: {
      access: "asldkjhasldfks",
      refresh: "asldkjhasldfks",
    },
  },
}));

export const createFetchUser = createRequestAction<User>(
  `user/fetchUser`,
  () => ({
    url: `accounts/users/me`,
    authenticated: true,
    mockData: {
      status: 200,
      body: {
        id: "asldkjhasldfks",
        admin: true,
        email: "test@mike.com",
        company: "asdf",
        msg_tracking: true,
        openai_model: "gpt-3.5-turbo",
      },
    },
  })
);

export const createPatchUser = createRequestAction<User>(
  `user/patchUser`,
  (payload: Partial<User>) => ({
    url: `accounts/users/me`,
    method: "PATCH",
    authenticated: true,
    payload,
    mockData: {
      status: 200,
      body: {
        id: "asldkjhasldfks",
        admin: true,
        email: "test@mike.com",
        company: "asdf",
        msg_tracking: true,
        openai_model: "gpt-3.5-turbo",
      },
    },
  })
);

export const createListTeam = createRequestAction<ListUsersRes>(
  `user/listTeam`,
  () => ({
    url: `accounts/users`,
    authenticated: true,
    mockData: {
      status: 200,
      body: [
        {
          id: "1",
          email: "test@1.com",
          admin: false,
          company: "asdf",
          openai_model: "gpt-3.5-turbo",
        },
        {
          id: "2",
          email: "test@2.com",
          admin: false,
          company: "asdf",
          openai_model: "gpt-3.5-turbo",
        },
      ],
    },
  })
);
