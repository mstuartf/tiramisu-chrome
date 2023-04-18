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
    const passesGenericChecks = await genericChecks(event);
    if (!passesGenericChecks) {
      return;
    }

    const btn = findMatchingParent(
      event.target as HTMLButtonElement,
      isLikeButton
    );

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
