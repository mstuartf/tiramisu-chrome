import React from "react";
import { setProfileSlug } from "../../redux/prospect/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProspectProfile,
  selectProspectSlug,
} from "../../redux/prospect/selectors";
import { createFetchProspectProfile } from "../../redux/prospect/actions";

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
  const prospectSlug = useSelector(selectProspectSlug);
  const prospectProfile = useSelector(selectProspectProfile);
  const dispatch = useDispatch();
  const getProspectSlug = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (tabs.length && tabs[0].url) {
        try {
          const profileSlug = extractProfileSlug(tabs[0].url);
          dispatch(setProfileSlug(profileSlug));
          dispatch(createFetchProspectProfile(profileSlug));
        } catch (e) {
          console.log(e);
        }
      }
    });
  };
  const clearProspectSlug = () => {
    dispatch(setProfileSlug(undefined));
  };

  return (
    <div>
      {!!prospectSlug ? (
        <>
          {prospectProfile ? (
            <div>
              <div>
                {prospectProfile.first_name} {prospectProfile.last_name}
              </div>
              <div>{prospectProfile.headline}</div>
            </div>
          ) : (
            <div>Generating for {prospectSlug}...</div>
          )}
          <div>
            <button onClick={clearProspectSlug}>reset</button>
          </div>
        </>
      ) : (
        <button onClick={getProspectSlug}>get url</button>
      )}
    </div>
  );
};

export default Prospect;
