import { ShowToast } from "../../toast/toast";
import {
  collectPostData,
  findMatchingParent,
  genericChecks,
  isPostContainer,
  logger,
  saveEvent,
} from "../utils";

export const createCommentListener =
  (showToast: ShowToast) => async (event: SubmitEvent) => {
    const passesGenericChecks = await genericChecks(event);
    if (!passesGenericChecks) {
      return;
    }

    const form = event.target as HTMLFormElement;
    if (!form.className.includes("comments-comment-box__form")) {
      logger("submit event did not come from a comment form");
      return;
    }

    const post = findMatchingParent(form, isPostContainer);

    if (!post) {
      logger("no post found");
      return;
    }

    // todo
    // const input = form.querySelector(".editor-container");
    // if (!input) {
    //   logger("no div input found inside comment form");
    //   return;
    // }
    // const content = (input as HTMLDivElement).innerText;

    const { profile_name, profile_slug, post_content } = collectPostData(post);

    showToast({
      type: "default",
      message: `You commented on ${profile_name}'s post. Record in CRM?`,
      buttons: [
        {
          text: "Yes",
          onClick: () =>
            saveEvent({
              type: "post_comment",
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
