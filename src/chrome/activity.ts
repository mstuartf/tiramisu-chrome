import { createToastManager } from "../toast/toast";
import { createMsgSentListener } from "./listeners/messages";
import { logger } from "./utils";
import { createLikeListener } from "./listeners/likes";
import { createCommentListener } from "./listeners/comments";

logger("tiramisu loaded");

export const activity = () => {
  const showToast = createToastManager();
  document.addEventListener("submit", createMsgSentListener(showToast));
  document.addEventListener("submit", createCommentListener(showToast));
  document.addEventListener("click", createLikeListener(showToast));
};

activity();
