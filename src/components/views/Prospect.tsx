import React, { useEffect, useState } from "react";
import { setProfile } from "../../redux/prospect/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectProspectProfile } from "../../redux/prospect/selectors";
import { selectTemplateIds } from "../../redux/templates/selectors";
import Loading from "../molecules/Loading";
import ProspectProfile from "../molecules/ProspectProfile";
import ProspectMessagesContainer from "../molecules/ProspectMessagesContainer";
import { extractProfileSlug, scrapeProfile } from "../../linkedin";
import Btn from "../atoms/Btn";

const Prospect = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [checkingErr, setCheckingErr] = useState<string | undefined>();
  const templateIds = useSelector(selectTemplateIds);

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
      setCheckingErr(`Could not find an active tab.`);
      setIsChecking(false);
      return;
    }
    let slug;
    try {
      slug = extractProfileSlug(tab.url!);
    } catch (e) {
      setCheckingErr(`Could not extract slug from url ${tab.url}`);
      dispatch(setProfile(undefined));
      setIsChecking(false);
      return;
    }

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeProfile,
    });

    if (!result.success) {
      setCheckingErr(`Could not scrape profile`);
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
      {isChecking || !templateIds ? (
        <Loading />
      ) : (
        <>
          {!!profile ? (
            <div>
              <ProspectProfile {...profile} />
              <ProspectMessagesContainer />
            </div>
          ) : (
            <div>
              <div>{checkingErr}</div>
              <Btn onClick={check}>Retry</Btn>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Prospect;
