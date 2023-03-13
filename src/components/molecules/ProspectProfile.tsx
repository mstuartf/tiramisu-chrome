import React from "react";
import { LinkedInProfile } from "../../redux/prospect/types";
import ProspectMessagesContainer from "./ProspectMessagesContainer";
import About from "../atoms/About";
const ProspectProfile = ({
  first_name,
  last_name,
  headline,
  summary,
}: LinkedInProfile) => (
  <div>
    <div className="mb-4 grid gap-2">
      <div className="flex gap-2 items-center">
        <div className="bg-gray-200 w-8 h-8 rounded-full shrink-0"></div>
        <div>
          <h2 className="font-semibold">
            {first_name} {last_name}
          </h2>
          <p className="text-gray-400">{headline}</p>
        </div>
      </div>
      <About summary={summary} />
    </div>
    <ProspectMessagesContainer />
  </div>
);

export default ProspectProfile;
