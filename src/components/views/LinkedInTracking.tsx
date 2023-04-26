import React, { useEffect } from "react";
import BoolConfig from "../molecules/BoolConfig";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import NavBar from "../molecules/NavBar";

const setBadge = async (auto_save: boolean) => {
  await chrome.action.setBadgeText({
    text: auto_save ? "ON" : "",
  });
  await chrome.action.setBadgeBackgroundColor({
    color: "#00FF00",
  });
};

const LinkedInTracking = () => {
  const { linkedin_tracking_enabled, auto_save } = useSelector(selectUser)!;

  useEffect(() => {
    setBadge(!!auto_save);
  }, [auto_save]);

  return (
    <div>
      <NavBar />
      {!linkedin_tracking_enabled ? (
        <div className="text-md text-gray-700">
          This feature has not been enabled.
        </div>
      ) : (
        <div className="grid gap-4">
          <BoolConfig
            prop="msg_tracking_activated"
            label="Save messages to CRM?"
          />
          <BoolConfig
            prop="like_tracking_activated"
            label="Save likes to CRM?"
          />
          <BoolConfig
            prop="comment_tracking_activated"
            label="Save comments to CRM?"
          />
          <BoolConfig prop="auto_save" label="Auto save activity to CRM?" />
        </div>
      )}
    </div>
  );
};

export default LinkedInTracking;
