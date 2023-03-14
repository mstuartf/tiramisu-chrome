import React, { useEffect, useState } from "react";
import { setProfile } from "../../redux/prospect/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectProspectProfile } from "../../redux/prospect/selectors";
import { selectPromptIds } from "../../redux/prompts/selectors";
import Loading from "../molecules/Loading";
import ProspectProfile from "../molecules/ProspectProfile";
import ProspectMessagesContainer from "../molecules/ProspectMessagesContainer";

const extractProfileSlug = (url: string): string => {
  const regex = new RegExp(
    `https:\\/\\/[^\\/\\.]*\\.linkedin\\.com\\/in\\/([^\\/]*)`
  );
  const match = url.match(regex);
  if (!match) {
    throw new Error("invalid url");
  }
  return match[1];
};

export const scrapeProfile = () => {
  const panel = document.querySelector(".pv-text-details__left-panel")!;
  const full_name = panel.querySelector("h1")!.innerText;
  const headline = panel.querySelectorAll("div")[1]!.innerText;
  const talks_about = panel
    .querySelectorAll("div")[2]!
    .querySelector("span")!.innerText;
  const summary = document
    .querySelectorAll("main > section")[3]
    .querySelectorAll("section > div")[2]
    .querySelector("span")!.innerText;
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

const Prospect = () => {
  const [isChecking, setIsChecking] = useState(false);
  const promptIds = useSelector(selectPromptIds);

  const profile = useSelector(selectProspectProfile);
  const dispatch = useDispatch();

  const check = async () => {
    setIsChecking(true);
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab || !tab.id) {
      dispatch(setProfile(undefined));
      setIsChecking(false);
      return;
    }
    let slug;
    try {
      slug = extractProfileSlug(tab.url!);
    } catch (e) {
      dispatch(setProfile(undefined));
      setIsChecking(false);
      return;
    }

    const [
      {
        result: { success, profile },
      },
    ] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeProfile,
    });
    console.log(profile);
    dispatch(setProfile({ ...profile, slug }));
    setIsChecking(false);
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      {isChecking || !promptIds ? (
        <Loading />
      ) : (
        <>
          {!!profile ? (
            <div>
              <ProspectProfile {...profile} />
              <ProspectMessagesContainer />
            </div>
          ) : (
            <>This is not a valid linkedin profile</>
          )}
        </>
      )}
    </div>
  );
};

export default Prospect;
