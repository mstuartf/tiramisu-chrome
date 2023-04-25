import { extractProfileSlug } from "../linkedin";
import { CheckAuthRes, Msg, SendMsgRes } from "./types";

export const logger = (msg: string) => console.log(`TIRAMISU: ${msg}`);

export function removeTrailingSlash(url: string) {
  return url[url.length - 1] === "/" ? url.substring(0, url.length - 1) : url;
}

export const withRetry = (
  href: string,
  resolve: (v: string) => void,
  reject: () => void,
  count = 0
) => {
  count = count + 1;
  if (count > 20) {
    reject();
    return;
  }
  // logger(`checking url attempt ${count}`)
  setTimeout(() => {
    const queryFrame =
      document.querySelector<HTMLIFrameElement>("iframe#myframe");
    if (!queryFrame || !queryFrame.contentWindow) {
      logger("iframe not found");
      reject();
      return;
    }
    const redirectUrl = queryFrame.contentWindow.location.href;
    if (
      removeTrailingSlash(redirectUrl) === removeTrailingSlash(href) ||
      redirectUrl === "about:blank"
    ) {
      return withRetry(href, resolve, reject, count);
    }
    queryFrame.remove();
    resolve(extractProfileSlug(redirectUrl));
  }, 100);
};
export const getProfileUrlAfterRedirect = async (
  href: string
): Promise<string> => {
  logger(`getting redirect url for ${href}`);
  const iframe = document.createElement("iframe");
  iframe.id = "myframe";
  iframe.setAttribute("src", href);
  document.body.appendChild(iframe);
  return new Promise((resolve, reject) => {
    withRetry(href, resolve, reject);
  });
};

export const saveEvent = <T extends Msg>(payload: T): Promise<null> =>
  new Promise((resolve, reject) => {
    chrome.runtime
      .sendMessage<T, SendMsgRes>(payload)
      .then(({ success, detail }) => {
        if (success) {
          resolve(null);
        } else {
          reject(detail);
        }
      })
      .catch((err) => reject(err));
  });

export const genericChecks = async (
  event: Event,
  prop:
    | "msg_tracking_activated"
    | "like_tracking_activated"
    | "comment_tracking_activated"
): Promise<{ passed: boolean; auto_save?: boolean }> => {
  const {
    success,
    detail: { auth, linkedin_tracking_enabled, auto_save, ...rest },
  } = await chrome.runtime.sendMessage<Msg, SendMsgRes<CheckAuthRes>>({
    type: "check_auth",
  });
  if (!success) {
    logger("error checking auth status");
    return { passed: false };
  }

  if (!auth) {
    logger("user is not logged in");
    return { passed: false };
  }

  if (!linkedin_tracking_enabled) {
    logger("user does not have linkedin_tracking_enabled");
    return { passed: false };
  }

  if (!rest[prop]) {
    logger(`user does not have ${prop}`);
    return { passed: false };
  }

  if (!event.target) {
    return { passed: false };
  }

  return { passed: true, auto_save };
};

export const findMatchingParent = (
  el: HTMLElement,
  matcher: (el: HTMLElement) => boolean
): HTMLElement | undefined => {
  let wrapper;
  let parent: HTMLElement = el;
  while (!wrapper) {
    if (!parent.parentElement) {
      break;
    }
    parent = parent.parentElement;
    if (matcher(parent)) {
      wrapper = parent;
    }
  }
  return wrapper;
};

export const isPostContainer = (el: HTMLElement): boolean => {
  return el.classList.contains("feed-shared-update-v2");
};

export const collectPostData = (
  post: HTMLElement
): { profile_slug: string; profile_name: string; post_content: string } => {
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

  return {
    profile_slug: extractProfileSlug(profile_url),
    profile_name,
    post_content: body!.textContent!.trim().slice(0, 100),
  };
};
