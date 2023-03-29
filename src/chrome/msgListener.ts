import { createToastManager } from "../toast/toast";
import { Omit } from "react-redux";

const logger = (msg: string) => console.log(`TIRAMISU: ${msg}`);

logger("tiramisu loaded");

interface Msg {
  type: string;
}

interface LinkedInMsg extends Msg {
  recipient_name: string;
  profile_url: string;
  content: string;
}

interface SendMsgRes<T = string> {
  success: boolean;
  detail: T;
}

const getProfileUrlAfterRedirect = async (href: string): Promise<string> => {
  logger(`getting redirect url for ${href}`);
  const iframe = document.createElement("iframe");
  iframe.id = "myframe";
  iframe.setAttribute("src", href);
  document.body.appendChild(iframe);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const queryFrame =
        document.querySelector<HTMLIFrameElement>("iframe#myframe");
      if (!queryFrame || !queryFrame.contentWindow) {
        logger("iframe not found");
        reject();
        return;
      }
      const redirectUrl = queryFrame.contentWindow.location.href;
      queryFrame.remove();
      resolve(redirectUrl);
    }, 2000);
  });
};

const saveMsg = (payload: Omit<LinkedInMsg, "type">): Promise<null> =>
  new Promise((resolve, reject) => {
    chrome.runtime
      .sendMessage<LinkedInMsg, SendMsgRes>({
        type: "msg_sent",
        ...payload,
      })
      .then(({ success, detail }) => {
        if (success) {
          resolve(null);
        } else {
          reject(detail);
        }
      })
      .catch((err) => reject(err));
  });

export const addListeners = () => {
  const showToast = createToastManager();

  document.addEventListener("submit", async (event) => {
    const { success, detail: isLoggedIn } = await chrome.runtime.sendMessage<
      Msg,
      SendMsgRes<boolean>
    >({ type: "check_auth" });
    if (!success) {
      logger("error checking auth status");
      return;
    }

    if (!isLoggedIn) {
      logger("user is not logged in");
      return;
    }

    if (!event.target) {
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
    const recipient_name = recipientHeader.innerText;

    let profileLink: HTMLAnchorElement | null;
    if (window.location.href.includes("/messaging/")) {
      profileLink = document.querySelector(
        `a[title="Open ${recipient_name}’s profile"]`
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
      message: `Record this message to ${recipient_name} in Salesforce?`,
      buttons: [
        {
          text: "Yes",
          onClick: () =>
            getProfileUrlAfterRedirect(href).then((profile_url) =>
              saveMsg({
                profile_url,
                content,
                recipient_name,
              })
            ),
        },
        {
          text: "No",
          onClick: () =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                reject("some error");
              }, 2000);
            }),
        },
      ],
    });
  });
};

addListeners();
