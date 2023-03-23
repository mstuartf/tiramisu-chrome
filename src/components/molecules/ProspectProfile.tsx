import React from "react";
import { LinkedInProfile } from "../../redux/prospect/types";
import About from "../atoms/About";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const ProspectProfile = ({
  full_name,
  headline,
  summary,
  talks_about,
  onUpdate,
}: LinkedInProfile & { onUpdate: () => void }) => (
  <div>
    <div className="mb-4 grid gap-2">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <div className="bg-gray-200 w-8 h-8 rounded-full shrink-0"></div>
          <div>
            <h2 className="font-semibold">{full_name}</h2>
            <p className="text-gray-400">{headline}</p>
          </div>
        </div>
        <div className="flex items-center shrink-0 pl-2">
          <button
            type="button"
            onClick={onUpdate}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition duration-300 ease-in-out"
          >
            <ArrowPathIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      {talks_about && <p className="text-gray-400">{talks_about}</p>}
      {summary && <About summary={summary} />}
    </div>
  </div>
);

export default ProspectProfile;
