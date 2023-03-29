import { wrapStore } from "webext-redux";
import { store } from "../redux/store";
import { loadState } from "../cache";
import { LinkedInMsg } from "./msgListener";

wrapStore(store);

// https://stackoverflow.com/a/15842031
chrome.runtime.onUpdateAvailable.addListener(function (details) {
  console.log("updating to version " + details.version);
  chrome.runtime.reload();
});

const saveMessageRequest = (
  payload: Omit<LinkedInMsg, "type">,
  token: string
) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/v2/messages/linkedin/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    console.log(response);
    return response;
  });

const refreshTokenRequest = (payload: { refresh: string }) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    console.log(response);
    return response;
  });

const getAuth = (): Promise<{ access: string; refresh: string }> =>
  loadState().then((state) => state?.user?.auth!);

const saveMsg = (payload: Omit<LinkedInMsg, "type">) =>
  getAuth().then(({ access, refresh }) =>
    saveMessageRequest(payload, access).then((r1: Response) =>
      r1.json().then((b1) => {
        if (r1.status === 401) {
          return refreshTokenRequest({ refresh }).then((r2) =>
            r2.json().then((b2) => saveMessageRequest(payload, b2.access))
          );
        }
        return b1;
      })
    )
  );

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === "msg_sent") {
    const { profile_slug, profile_name, content } = request as LinkedInMsg;
    saveMsg({ profile_slug, profile_name, content })
      .then(() => {
        sendResponse({ success: true });
      })
      .catch(() => {
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
