import { wrapStore } from "webext-redux";
import { store } from "../redux/store";
import { loadState } from "../cache";

wrapStore(store);

// https://stackoverflow.com/a/15842031
chrome.runtime.onUpdateAvailable.addListener(function (details) {
  console.log("updating to version " + details.version);
  chrome.runtime.reload();
});

const httpCall = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 2000);
  });

// todo get access token
// send token with api call
// handle need to refresh

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.type === "msg_sent") {
    httpCall()
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
