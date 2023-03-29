import { wrapStore } from "webext-redux";
import { RootState, store } from "../redux/store";
import { loadState, saveState } from "../cache";
import { LinkedInMsg } from "./msgListener";

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

const saveMsg = (payload: Omit<LinkedInMsg, "type">) =>
  getAuth().then(({ access, refresh }) =>
    saveMessageRequest(payload, access).then((res1) => {
      if (res1.status === 401) {
        return refreshTokenRequest({ refresh }).then(
          ({ body: { access: updatedAccess, refresh, exp } }) =>
            updateAuth({
              access: updatedAccess,
              refresh,
              exp,
            }).then(() => saveMessageRequest(payload, updatedAccess))
        );
      }
      return res1;
    })
  );

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === "msg_sent") {
    const { profile_slug, profile_name, content } = request as LinkedInMsg;
    saveMsg({ profile_slug, profile_name, content })
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
        sendResponse({ success: true, detail: !!state?.user?.auth });
      })
      .catch(() => {
        sendResponse({ success: false });
      });
    return true; // return true to indicate you want to send a response asynchronously
  }
});
