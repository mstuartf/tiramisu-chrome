import { wrapStore } from "webext-redux";
import { RootState, store } from "../redux/store";
import { loadState, saveState } from "../cache";
import {
  CheckAuthRes,
  LinkedInComment,
  LinkedInLike,
  LinkedInMsg,
  SendMsgRes,
} from "./types";

wrapStore(store);

// https://stackoverflow.com/a/15842031
chrome.runtime.onUpdateAvailable.addListener(function (details) {
  console.log("updating to version " + details.version);
  chrome.runtime.reload();
});

const fetchWrapper = (
  url: string,
  init: RequestInit
): Promise<{ status: number; body: any }> =>
  new Promise((resolve, reject) => {
    fetch(url, init).then((response) =>
      response
        .json()
        .then((data) => resolve({ status: response.status, body: data }))
    );
  });

const saveMessageRequest = (
  payload: Omit<LinkedInMsg, "type">,
  token: string
) =>
  fetchWrapper(`${process.env.REACT_APP_BACKEND_URL}/v2/messages/linkedin/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

const saveLikeRequest = (payload: Omit<LinkedInLike, "type">, token: string) =>
  fetchWrapper(
    `${process.env.REACT_APP_BACKEND_URL}/v2/messages/linkedin/like/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

const saveCommentRequest = (
  payload: Omit<LinkedInComment, "type">,
  token: string
) =>
  fetchWrapper(
    `${process.env.REACT_APP_BACKEND_URL}/v2/messages/linkedin/comment/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

const refreshTokenRequest = (payload: { refresh: string }) =>
  fetchWrapper(`${process.env.REACT_APP_BACKEND_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

const getAuth = (): Promise<{ access: string; refresh: string; exp: number }> =>
  loadState().then((state) => state?.user?.auth!);

const updateAuth = (auth: {
  access: string;
  refresh: string;
  exp: number;
}): Promise<void> =>
  loadState().then((state) => {
    const updated: RootState = {
      ...state!,
      user: {
        ...state!.user,
        auth,
      },
    };
    return saveState(updated);
  });

const withAuthRetry = <Payload extends object>(
  requestFn: (
    payload: Payload,
    access: string
  ) => Promise<{ status: number; body: any }>,
  payload: Payload
) =>
  getAuth().then(({ access, refresh }) =>
    requestFn(payload, access).then((res1) => {
      if (res1.status === 401) {
        return refreshTokenRequest({ refresh }).then(
          ({ body: { access: updatedAccess, refresh, exp } }) =>
            updateAuth({
              access: updatedAccess,
              refresh,
              exp,
            }).then(() => requestFn(payload, updatedAccess))
        );
      }
      return res1;
    })
  );

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === "msg_sent") {
    const { profile_slug, profile_name, content } = request as LinkedInMsg;
    withAuthRetry(saveMessageRequest, { profile_slug, profile_name, content })
      .then(({ status, body }) => {
        sendResponse({ success: status === 201, detail: body?.detail });
      })
      .catch((e) => {
        sendResponse({ success: false });
      });
    return true; // return true to indicate you want to send a response asynchronously
  }
  if (request.type === "post_liked") {
    const { profile_slug, profile_name, post_content } =
      request as LinkedInLike;
    withAuthRetry(saveLikeRequest, { profile_slug, profile_name, post_content })
      .then(({ status, body }) => {
        sendResponse({ success: status === 201, detail: body?.detail });
      })
      .catch((e) => {
        sendResponse({ success: false });
      });
    return true; // return true to indicate you want to send a response asynchronously
  }
  if (request.type === "post_comment") {
    const { profile_slug, profile_name, post_content } =
      request as LinkedInComment;
    withAuthRetry(saveCommentRequest, {
      profile_slug,
      profile_name,
      post_content,
    })
      .then(({ status, body }) => {
        sendResponse({ success: status === 201, detail: body?.detail });
      })
      .catch((e) => {
        sendResponse({ success: false });
      });
    return true; // return true to indicate you want to send a response asynchronously
  }
  if (request.type === "check_auth") {
    loadState()
      .then((state) => {
        const res: SendMsgRes<CheckAuthRes> = {
          success: true,
          detail: {
            auth: state?.user?.auth!,
            linkedin_tracking_enabled:
              state?.user.user?.linkedin_tracking_enabled,
            msg_tracking_activated: state?.user.user?.msg_tracking_activated!,
            like_tracking_activated: state?.user.user?.like_tracking_activated!,
            comment_tracking_activated:
              state?.user.user?.comment_tracking_activated!,
            auto_save: state?.user.user?.auto_save!,
          },
        };
        sendResponse(res);
      })
      .catch(() => {
        sendResponse({ success: false });
      });
    return true; // return true to indicate you want to send a response asynchronously
  }
});
