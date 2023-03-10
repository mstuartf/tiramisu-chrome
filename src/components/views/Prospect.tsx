import React from "react";
import { Link } from "react-router-dom";
import { setProfileSlug } from "../../redux/prospect/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectProspectSlug } from "../../redux/prospect/selectors";

const extractProfileSlug = (url: string): string => {
  const regex = new RegExp(`https:\\/\\/[^\\/\\.]*\\.linkedin\\.com\\/in\\/([^\\/]*)`);
  const match = url.match(regex);
  if (!match) {
    throw new Error('invalid url')
  }
  return match[1];
}


const Prospect = () => {
  const prospectSlug = useSelector(selectProspectSlug);
  const dispatch = useDispatch();
  const getProspectSlug = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      if (tabs.length && tabs[0].url) {
        try {
          const profileSlug = extractProfileSlug(tabs[0].url);
          dispatch(setProfileSlug(profileSlug));
        } catch (e) {
          console.log(e)
        }
      }
    });
  }
  const clearProspectSlug = () => {
    dispatch(setProfileSlug(undefined));
  }

  return  (
    <div>
      {!!prospectSlug ? (
        <>
          <div>
            Generating for {prospectSlug}...
          </div>
          <div>
            <button onClick={clearProspectSlug}>
              reset
            </button>
          </div>
        </>
      ) : (
        <button onClick={getProspectSlug}>
          get url
        </button>
      )}
    </div>
  )
}

export default Prospect;
