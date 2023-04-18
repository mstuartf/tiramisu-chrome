import { createToastManager } from "../toast/toast";
import { createMsgSentListener } from "./listeners/messages";
import { logger } from "./utils";
import { createLikeListener } from "./listeners/likes";

logger("tiramisu loaded");

export const activity = () => {
  const showToast = createToastManager();
  document.addEventListener("submit", createMsgSentListener(showToast));
  document.addEventListener("click", createLikeListener(showToast));
};

activity();
