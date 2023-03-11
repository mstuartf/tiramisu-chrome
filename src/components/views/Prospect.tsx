import React, { useEffect, useState } from "react";
import { setProfileSlug } from "../../redux/prospect/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectProspectSlug } from "../../redux/prospect/selectors";
import ProspectProfileContainer from "../molecules/ProspectProfileContainer";
import { selectPromptIds } from "../../redux/prompts/selectors";

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

const Prospect = () => {
  const [isChecking, setIsChecking] = useState(false);
  const promptIds = useSelector(selectPromptIds);

  const prospectSlug = useSelector(selectProspectSlug);
  const dispatch = useDispatch();

  const check = () => {
    setIsChecking(true);
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (tabs.length && tabs[0].url) {
        try {
          const profileSlug = extractProfileSlug(tabs[0].url);
          if (profileSlug !== prospectSlug) {
            dispatch(setProfileSlug(profileSlug));
          }
          setIsChecking(false);
        } catch (e) {
          dispatch(setProfileSlug(undefined));
          setIsChecking(false);
        }
      }
    });
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      {isChecking || !promptIds ? (
        <>Loading...</>
      ) : (
        <>
          {!!prospectSlug ? (
            <ProspectProfileContainer />
          ) : (
            <>not a valid linkedin profile</>
          )}
        </>
      )}
    </div>
  );
};

export default Prospect;
