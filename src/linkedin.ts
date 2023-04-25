import { LinkedInProfile } from "./redux/prospect/types";

export const extractProfileSlug = (url: string): string => {
  const regex = new RegExp(
    `https:\\/\\/[^\\/\\.]*\\.linkedin\\.com\\/([A-z]+)\\/([^\\/?]*)[\\?]?`
  );
  const match = decodeURI(url).match(regex);
  if (!match) {
    throw new Error("invalid url");
  }
  if (match[1] !== "in") {
    throw new Error(`unsupported page type: ${match[1]}`);
  }
  return match[2];
};

export const scrapeProfile = ():
  | { success: false }
  | { success: true; profile: Omit<LinkedInProfile, "slug"> } => {
  // these three are required
  let panel;
  let full_name;
  let headline;
  try {
    panel = document.querySelector(".pv-text-details__left-panel")!;
    full_name = panel.querySelector("h1")!.innerText;
    headline = panel.querySelectorAll("div")[1]!.innerText;
  } catch {
    return {
      success: false,
    };
  }

  let profile_pic_url;
  try {
    let img = document.querySelector(
      ".pv-top-card-profile-picture__image"
    ) as HTMLImageElement;
    if (!img) {
      // different class on own profile
      img = document.querySelector(
        ".profile-photo-edit__preview"
      ) as HTMLImageElement;
    }
    profile_pic_url = img?.src;
  } catch {}

  let talks_about;
  try {
    talks_about = panel
      .querySelectorAll("div")[2]!
      .querySelector("span")!.innerText;
  } catch {}

  let summary;
  try {
    summary = document
      .getElementById("about")!
      .parentElement!.querySelectorAll("section > div")[2]
      .querySelector("span")!.innerText;
  } catch {}

  return {
    success: true,
    profile: {
      full_name,
      headline,
      talks_about,
      summary,
      profile_pic_url,
    },
  };
};
