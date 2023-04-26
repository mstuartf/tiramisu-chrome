import React from "react";
import BoolConfig from "../molecules/BoolConfig";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import NavBar from "../molecules/NavBar";

const LinkedInTracking = () => {
  const { linkedin_tracking_enabled } = useSelector(selectUser)!;

  if (!linkedin_tracking_enabled) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <div className="grid gap-4">
        <div className="grid gap-2">
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
      </div>
    </div>
  );
};

export default LinkedInTracking;
