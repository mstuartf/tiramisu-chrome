import { ShowToast } from "../../toast/toast";
import { findMatchingParent, genericChecks, logger, saveEvent } from "../utils";
import { extractProfileSlug } from "../../linkedin";

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

const isPostContainer = (el: HTMLElement): boolean => {
  return el.className.includes("feed-shared-update-v2");
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
      console.log("not a like button");
      return;
    }

    const post = findMatchingParent(btn, isPostContainer);

    if (!post) {
      console.log("no post found");
      return;
    }

    let profile_url: string;
    let profile_name: string;
    const shareHeader = post.querySelector(".update-components-header");

    if (!!shareHeader) {
      const profileLink = shareHeader.querySelector(
        "a.app-aware-link"
      ) as HTMLAnchorElement;
      const nameLink = shareHeader.querySelector("a:not(.app-aware-link)");
      profile_url = profileLink!.href;
      profile_name = nameLink!.textContent!;
    } else {
      const actorHeader = post.querySelector(".update-components-actor")!;
      const profileLink = actorHeader.querySelector(
        "a.app-aware-link"
      ) as HTMLAnchorElement;
      const nameSpan = actorHeader.querySelector(
        "span.update-components-actor__name > span:not(.visually-hidden)"
      ) as HTMLSpanElement;
      profile_url = profileLink!.href;
      profile_name = nameSpan!.textContent!;
    }

    const body = post.querySelector("div.update-components-text");
    const content = body!.textContent!.trim().slice(0, 100);

    showToast({
      type: "default",
      message: `You liked ${profile_name}'s post. Record in Salesforce?`,
      buttons: [
        {
          text: "Yes",
          onClick: () =>
            saveEvent({
              type: "post_liked",
              profile_slug: extractProfileSlug(profile_url),
              profile_name,
              content,
            }),
        },
        {
          text: "No",
          onClick: () => new Promise((resolve) => resolve(null)),
        },
      ],
    });
  };
