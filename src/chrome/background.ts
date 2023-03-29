import { wrapStore } from "webext-redux";
import { store } from "../redux/store";

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  httpCall()
    .then(() => {
      sendResponse({ success: true });
    })
    .catch(() => {
      sendResponse({ success: false });
    });
  return true; // return true to indicate you want to send a response asynchronously
});
