import { ShowToast } from "../../toast/toast";
import {
  genericChecks,
  getProfileUrlAfterRedirect,
  logger,
  saveEvent,
} from "../utils";

export const createMsgSentListener =
  (showToast: ShowToast) => async (event: SubmitEvent) => {
    const passesGenericChecks = await genericChecks(event);
    if (!passesGenericChecks) {
      return;
    }

    const form = event.target as HTMLFormElement;
    if (!form.className.includes("msg-form")) {
      logger("submit event did not come from a message form");
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
      message: `You sent a message to ${profile_name}. Record in CRM?`,
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
