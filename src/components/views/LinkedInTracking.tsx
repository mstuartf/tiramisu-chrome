import React from "react";
import BoolConfig from "../molecules/BoolConfig";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import NavBar from "../molecules/NavBar";

const LinkedInTracking = () => {
  const { linkedin_tracking_enabled } = useSelector(selectUser)!;

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
