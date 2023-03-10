import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProspectProfile,
  selectProspectProfileIsLoading,
  selectProspectSlug,
} from "../../redux/prospect/selectors";
import ProspectProfile from "./ProspectProfile";
import { createFetchProspectProfile } from "../../redux/prospect/actions";

const ProspectProfileContainer = () => {
  const dispatch = useDispatch();
  const prospectSlug = useSelector(selectProspectSlug);
  const prospectProfile = useSelector(selectProspectProfile);
  const prospectProfileIsLoading = useSelector(selectProspectProfileIsLoading);
  const generate = () => {
    dispatch(createFetchProspectProfile(prospectSlug));
  };

  if (!prospectProfile && !prospectProfileIsLoading) {
    return <button onClick={generate}>GENERATE</button>;
  }

  if (!prospectProfile) {
    return <>Loading...</>;
  }

  return <ProspectProfile {...prospectProfile} />;
};

export default ProspectProfileContainer;
