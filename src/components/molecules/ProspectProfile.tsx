import React from "react";
import { LinkedInProfile } from "../../redux/prospect/types";
import ProspectMessagesContainer from "./ProspectMessagesContainer";
const ProspectProfile = ({
  first_name,
  last_name,
  headline,
}: LinkedInProfile) => (
  <div>
    <div>
      {first_name} {last_name}
    </div>
    <div>{headline}</div>
    <ProspectMessagesContainer />
  </div>
);

export default ProspectProfile;
