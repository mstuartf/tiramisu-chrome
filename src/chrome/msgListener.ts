import { createToastManager } from "../toast/toast";

console.log("tiramisu loaded");

export const addListeners = () => {
  const showToast = createToastManager();

  document.addEventListener("submit", (event) => {
    if (!event.target) {
      return;
    }
    const form = event.target as HTMLFormElement;
    if (!form.className.includes("msg-form")) {
      console.log("submit event did not come from a message form");
      console.log(form.className);
      return;
    }
    const input = form.querySelector(".msg-form__contenteditable");
    if (!input) {
      console.log("no div input found inside message form");
      return;
    }
    // const msg = (input as HTMLDivElement).innerText;

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
      console.log("no wrapper with matching class");
      return;
    }
    const recipient = wrapper.querySelector("h2");
    if (!recipient) {
      console.log("no h2 inside wrapper");
      return;
    }
    const recipientName = recipient.innerText;
    showToast({
      type: "default",
      message: `Record this message to ${recipientName} in Salesforce?`,
      buttons: [
        {
          text: "Yes",
          onClick: () =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(null);
              }, 2000);
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
