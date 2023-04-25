import { ShowToast } from "../../toast/toast";
import {
  collectPostData,
  findMatchingParent,
  genericChecks,
  isPostContainer,
  saveEvent,
  logger,
} from "../utils";

const isLikeButton = (el: HTMLElement): boolean => {
  if (el.nodeName !== "SPAN") {
    return false;
  }
  if (!el.className.includes("reactions-react-button")) {
    return false;
  }
  const btn = el.querySelector("button");

  if (!btn) {
    return false;
  }
  const ariaLabel = btn.attributes.getNamedItem("aria-label");

  if (!ariaLabel) {
    return false;
  }

  // as soon as it is clicked the label changes to 'unreact'
  return ariaLabel.value.startsWith("Unreact Like to");
};

export const createLikeListener =
  (showToast: ShowToast) => async (event: Event) => {
    const passesGenericChecks = await genericChecks(
      event,
      "like_tracking_activated"
    );
    if (!passesGenericChecks) {
      return;
    }

    let el: HTMLElement | null = event.target as HTMLElement | null;
    if (!el) {
      return;
    }

    // The SVG is removed from the dom as soon as the button is clicked. So if the original event
    // target is the SVG, then event.target.parentElement is null and we cannot find the ancestor
    // button element. In this case, we can use the event coordinates to find the button.
    if (
      el.tagName.toLowerCase() === "svg" &&
      el.dataset.testIcon === "thumbs-up-outline-medium"
    ) {
      const { clientX, clientY } = event as any;
      el = document.elementFromPoint(clientX, clientY) as HTMLElement;
    }

    const btn = findMatchingParent(el, isLikeButton);

    if (!btn) {
      logger("not a like button");
      return;
    }

    const post = findMatchingParent(btn, isPostContainer);

    if (!post) {
      logger("no post found");
      return;
    }

    const { profile_name, profile_slug, post_content } = collectPostData(post);

    showToast({
      type: "default",
      message: `You liked ${profile_name}'s post. Record in CRM?`,
      buttons: [
        {
          text: "Yes",
          onClick: () =>
            saveEvent({
              type: "post_liked",
              profile_slug,
              profile_name,
              post_content,
            }),
        },
        {
          text: "No",
          onClick: () => new Promise((resolve) => resolve(null)),
        },
      ],
    });
  };
