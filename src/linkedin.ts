import { LinkedInProfile } from "./redux/prospect/types";

export const extractProfileSlug = (url: string): string => {
  const regex = new RegExp(
    `https:\\/\\/[^\\/\\.]*\\.linkedin\\.com\\/in\\/([^\\/]*)`
  );
  const match = url.match(regex);
  if (!match) {
    throw new Error("invalid url");
  }
  return match[1];
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
    },
  };
};
