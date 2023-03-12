import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProspectProfile,
  selectProspectProfileError,
  selectProspectProfileIsLoading,
  selectProspectSlug,
} from "../../redux/prospect/selectors";
import ProspectProfile from "./ProspectProfile";
import { createFetchProspectProfile } from "../../redux/prospect/actions";
import Retry from "../atoms/Retry";
import GenerateMessages from "./GenerateMessages";
import Loading from "./Loading";

const ProspectProfileContainer = () => {
  const dispatch = useDispatch();
  const prospectSlug = useSelector(selectProspectSlug);
  const prospectProfile = useSelector(selectProspectProfile);
  const prospectProfileIsLoading = useSelector(selectProspectProfileIsLoading);
  const prospectProfileError = useSelector(selectProspectProfileError);
  const generate = () => {
    dispatch(createFetchProspectProfile({ slug: prospectSlug }));
  };

  if (prospectProfileError) {
    return (
      <Retry
        status={prospectProfileError}
        onRetry={generate}
        noRetryMessage="Unable to scrape profile."
      />
    );
  }

  if (!prospectProfile && !prospectProfileIsLoading) {
    return (
      <div className="grid gap-4 text-gray-700">
        <div>
          To generate ice breakers for this profile, select the style of message
          that you would like then click the button.
        </div>
        <div>To add new styles, go to the Styles tab.</div>
        <GenerateMessages onGenerate={generate} btnText="Generate" />
      </div>
    );
  }

  if (!prospectProfile) {
    return <Loading />;
  }

  return (
    <>
      <ProspectProfile {...prospectProfile} />
    </>
  );
};

export default ProspectProfileContainer;
