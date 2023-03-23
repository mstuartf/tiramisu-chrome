import React from "react";
import { LinkedInProfile } from "../../redux/prospect/types";
import About from "../atoms/About";
import RefreshBtn from "../atoms/RefreshBtn";

const ProspectProfile = ({
  full_name,
  headline,
  summary,
  talks_about,
  profile_pic_url,
  onUpdate,
  disabled,
}: LinkedInProfile & { onUpdate: () => void; disabled?: boolean }) => (
  <div>
    <div className="mb-4 grid gap-2">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <div className="bg-gray-200 w-8 h-8 rounded-full shrink-0 overflow-hidden">
            {profile_pic_url && <img src={profile_pic_url} alt="profile img" />}
          </div>
          <div>
            <h2 className="font-semibold">{full_name}</h2>
            <p className="text-gray-400">{headline}</p>
          </div>
        </div>
        <div className="flex items-center shrink-0 pl-2">
          <RefreshBtn onClick={onUpdate} disabled={disabled} />
        </div>
      </div>
      {talks_about && <p className="text-gray-400">{talks_about}</p>}
      {summary && <About summary={summary} />}
    </div>
  </div>
);

export default ProspectProfile;
