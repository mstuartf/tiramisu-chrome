import React, { useState } from "react";
import { setProfile } from "../../redux/prospect/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessagesLoadingState,
  selectProspectProfile,
} from "../../redux/prospect/selectors";
import { createSelectMyTemplateIds } from "../../redux/templates/selectors";
import Loading from "../molecules/Loading";
import ProspectProfile from "../molecules/ProspectProfile";
import ProspectMessagesContainer from "../molecules/ProspectMessagesContainer";
import { extractProfileSlug, scrapeProfile } from "../../linkedin";
import Btn from "../atoms/Btn";
import { selectUser } from "../../redux/user/selectors";

const Prospect = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [checkingErr, setCheckingErr] = useState<string | undefined>();
  const { id: userId } = useSelector(selectUser)!;
  const templateIds = useSelector(createSelectMyTemplateIds(userId));
  const messagesIsLoading = useSelector(selectMessagesLoadingState);

  const profile = useSelector(selectProspectProfile);
  const dispatch = useDispatch();

  const scanPage = async () => {
    setIsChecking(true);
    setCheckingErr(undefined);
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

  return (
    <div>
      {isChecking || !templateIds ? (
        <Loading />
      ) : (
        <>
          {!!profile ? (
            <div>
              <ProspectProfile
                {...profile}
                onUpdate={scanPage}
                disabled={messagesIsLoading}
              />
              <ProspectMessagesContainer />
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="text-gray-700 break-words">
                {checkingErr || "Scan this page?"}
              </div>
              <Btn onClick={scanPage}>Scan</Btn>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Prospect;
