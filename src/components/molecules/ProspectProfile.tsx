import React from "react";
import { LinkedInProfile } from "../../redux/prospect/types";
import ProspectMessagesContainer from "./ProspectMessagesContainer";
const ProspectProfile = ({
  first_name,
  last_name,
  headline,
}: LinkedInProfile) => (
  <div>
    <div className="mb-4">
      <div className="flex gap-2 items-center">
        <div className="bg-gray-200 w-8 h-8 rounded-full"></div>
        <div>
          <h2 className="font-semibold">
            {first_name} {last_name}
          </h2>
          <p className="text-gray-400">{headline}</p>
        </div>
      </div>
    </div>
    <ProspectMessagesContainer />
  </div>
);

export default ProspectProfile;
