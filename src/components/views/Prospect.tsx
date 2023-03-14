import React, { useEffect, useState } from "react";
import { setProfile } from "../../redux/prospect/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectProspectProfile } from "../../redux/prospect/selectors";
import { selectPromptIds } from "../../redux/prompts/selectors";
import Loading from "../molecules/Loading";
import ProspectProfile from "../molecules/ProspectProfile";
import ProspectMessagesContainer from "../molecules/ProspectMessagesContainer";
import { extractProfileSlug, scrapeProfile } from "../../linkedin";

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

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeProfile,
    });

    if (!result.success) {
      dispatch(setProfile(undefined));
      setIsChecking(false);
      return;
    }

    const { profile } = result;

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
