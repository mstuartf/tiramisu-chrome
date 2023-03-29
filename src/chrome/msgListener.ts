import { createToastManager } from "../toast/toast";

const logger = (msg: string) => console.log(`TIRAMISU: ${msg}`);

logger("tiramisu loaded");

interface Msg {
  type: "msg_sent";
  recipient_name: string;
  content: string;
}

interface SendMsgRes {
  success: boolean;
  detail: string;
}

export const addListeners = () => {
  const showToast = createToastManager();

  document.addEventListener("submit", (event) => {
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
    const recipient = wrapper.querySelector("h2");
    if (!recipient) {
      logger("no h2 inside wrapper");
      return;
    }
    const recipient_name = recipient.innerText;
    showToast({
      type: "default",
      message: `Record this message to ${recipient_name} in Salesforce?`,
      buttons: [
        {
          text: "Yes",
          onClick: () =>
            new Promise((resolve, reject) => {
              chrome.runtime
                .sendMessage<Msg, SendMsgRes>({
                  type: "msg_sent",
                  recipient_name,
                  content,
                })
                .then(({ success, detail }) => {
                  if (success) {
                    resolve(null);
                  } else {
                    reject(detail);
                  }
                })
                .catch((err) => reject(err));
            }),
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
