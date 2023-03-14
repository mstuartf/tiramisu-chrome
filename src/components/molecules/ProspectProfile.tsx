import React from "react";
import { LinkedInProfile } from "../../redux/prospect/types";
import About from "../atoms/About";

const ProspectProfile = ({
  full_name,
  headline,
  summary,
  talks_about,
}: LinkedInProfile) => (
  <div>
    <div className="mb-4 grid gap-2">
      <div className="flex gap-2 items-center">
        <div className="bg-gray-200 w-8 h-8 rounded-full shrink-0"></div>
        <div>
          <h2 className="font-semibold">{full_name}</h2>
          <p className="text-gray-400">{headline}</p>
        </div>
      </div>
      <p className="text-gray-400">{talks_about}</p>
      <About summary={summary} />
    </div>
  </div>
);

export default ProspectProfile;
