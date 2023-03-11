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

const ProspectProfileContainer = () => {
  const dispatch = useDispatch();
  const prospectSlug = useSelector(selectProspectSlug);
  const prospectProfile = useSelector(selectProspectProfile);
  const prospectProfileIsLoading = useSelector(selectProspectProfileIsLoading);
  const prospectProfileError = useSelector(selectProspectProfileError);
  const generate = () => {
    dispatch(createFetchProspectProfile(prospectSlug));
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
    return <GenerateMessages onGenerate={generate} btnText="Generate" />;
  }

  if (!prospectProfile) {
    return <>Loading...</>;
  }

  return (
    <>
      <ProspectProfile {...prospectProfile} />
    </>
  );
};

export default ProspectProfileContainer;
