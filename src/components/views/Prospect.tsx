import React, { useState } from "react";
import { Link } from "react-router-dom";

const Prospect = () => {
  const [profileUrl, setProfileUrl] = useState<string | undefined>(undefined);
  const getUrl = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      if (tabs.length) {
        setProfileUrl(tabs[0].url);
      }
    });
  }

  return  (
    <div>
      Prospect
      <div>
        {profileUrl}
      </div>
      <Link to="/prompts">
        Prompts
      </Link>
      <button onClick={getUrl}>
        get url
      </button>
    </div>
  )
}

export default Prospect;
