import { createToastManager, ShowToast } from "../toast/toast";
import { Omit } from "react-redux";
import { extractProfileSlug } from "../linkedin";

const logger = (msg: string) => console.log(`TIRAMISU: ${msg}`);

logger("tiramisu loaded");

interface Msg {
  type: string;
}

export interface LinkedInMsg extends Msg {
  profile_name: string;
  profile_slug: string;
  content: string;
}

interface SendMsgRes<T = string> {
  success: boolean;
  detail: T;
}

function removeTrailingSlash(url: string) {
  return url[url.length - 1] === "/" ? url.substring(0, url.length - 1) : url;
}

const withRetry = (
  href: string,
  resolve: (v: string) => void,
  reject: () => void,
  count = 0
) => {
  count = count + 1;
  if (count > 20) {
    reject();
    return;
  }
  // logger(`checking url attempt ${count}`)
  setTimeout(() => {
    const queryFrame =
      document.querySelector<HTMLIFrameElement>("iframe#myframe");
    if (!queryFrame || !queryFrame.contentWindow) {
      logger("iframe not found");
      reject();
      return;
    }
    const redirectUrl = queryFrame.contentWindow.location.href;
    if (
      removeTrailingSlash(redirectUrl) === removeTrailingSlash(href) ||
      redirectUrl === "about:blank"
    ) {
      return withRetry(href, resolve, reject, count);
    }
    queryFrame.remove();
    resolve(extractProfileSlug(redirectUrl));
  }, 100);
};

const getProfileUrlAfterRedirect = async (href: string): Promise<string> => {
  logger(`getting redirect url for ${href}`);
  const iframe = document.createElement("iframe");
  iframe.id = "myframe";
  iframe.setAttribute("src", href);
  document.body.appendChild(iframe);
  return new Promise((resolve, reject) => {
    withRetry(href, resolve, reject);
  });
};

const saveEvent = <T extends Msg>(payload: T): Promise<null> =>
  new Promise((resolve, reject) => {
    chrome.runtime
      .sendMessage<T, SendMsgRes>(payload)
      .then(({ success, detail }) => {
        if (success) {
          resolve(null);
        } else {
          reject(detail);
        }
      })
      .catch((err) => reject(err));
  });

const genericChecks = async (event: Event): Promise<boolean> => {
  const {
    success,
    detail: { auth, msg_tracking_activated, msg_tracking_enabled },
  } = await chrome.runtime.sendMessage<
    Msg,
    SendMsgRes<{
      auth: { access: string; refresh: string };
      msg_tracking_activated: boolean;
      msg_tracking_enabled: boolean;
    }>
  >({ type: "check_auth" });
  if (!success) {
    logger("error checking auth status");
    return false;
  }

  if (!auth) {
    logger("user is not logged in");
    return false;
  }

  if (!msg_tracking_enabled) {
    logger("user does not have msg_tracking_enabled");
    return false;
  }

  if (!msg_tracking_activated) {
    logger("user does not have msg_tracking_activated");
    return false;
  }

  if (!event.target) {
    return false;
  }

  return true;
};

const createMsgSentListener =
  (showToast: ShowToast) => async (event: SubmitEvent) => {
    const passesGenericChecks = await genericChecks(event);
    if (!passesGenericChecks) {
      return;
    }

    const form = event.target as HTMLFormElement;
    if (!form.className.includes("msg-form")) {
      logger("submit event did not come from a message form");
      logger(form.className);
      return;
    }
    const input = form.querySelector(".msg-form__contenteditable");
    if (!input) {
      logger("no div input found inside message form");
      return;
    }
    const content = (input as HTMLDivElement).innerText;

    let wrapper;
    let parent: HTMLElement = form;
    while (!wrapper) {
      if (!parent.parentElement) {
        break;
      }
      parent = parent.parentElement;
      if (parent.className.includes("msg-convo-wrapper")) {
        wrapper = parent;
      }
    }
    if (!wrapper) {
      logger("no wrapper with matching class");
      return;
    }
    const recipientHeader = wrapper.querySelector("h2");
    if (!recipientHeader) {
      logger("no h2 inside wrapper");
      return;
    }
    const profile_name = recipientHeader.innerText;

    let profileLink: HTMLAnchorElement | null;
    if (window.location.href.includes("/messaging/")) {
      profileLink = document.querySelector(
        `a[title="Open ${profile_name}’s profile"]`
      );
    } else {
      profileLink = recipientHeader.querySelector("a");
    }

    if (!profileLink) {
      console.log("no profile link found");
      return;
    }

    let href = profileLink.href;
    if (!href.includes("https")) {
      href = `${window.location.origin}${href}`;
    }

    showToast({
      type: "default",
      message: `Record this message to ${profile_name} in Salesforce?`,
      buttons: [
        {
          text: "Yes",
          onClick: () =>
            getProfileUrlAfterRedirect(href).then((profile_slug) =>
              saveEvent({
                type: "msg_sent",
                profile_slug,
                content,
                profile_name,
              })
            ),
        },
        {
          text: "No",
          onClick: () => new Promise((resolve) => resolve(null)),
        },
      ],
    });
  };

export const addListeners = () => {
  const showToast = createToastManager();
  document.addEventListener("submit", createMsgSentListener(showToast));
};

addListeners();
