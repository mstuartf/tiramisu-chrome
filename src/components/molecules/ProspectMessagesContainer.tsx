import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProspectMessages,
  selectProspectMessagesError,
  selectProspectMessagesIsLoading,
  selectProspectProfile,
} from "../../redux/prospect/selectors";
import { createGenerateMessages } from "../../redux/prospect/actions";
import ProspectMessages from "./ProspectMessages";
import Retry from "../atoms/Retry";
import Loading from "./Loading";

const ProspectMessagesContainer = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(selectProspectProfile)!;
  const messagesIsLoading = useSelector(selectProspectMessagesIsLoading);
  const messages = useSelector(selectProspectMessages);
  const messagesError = useSelector(selectProspectMessagesError);

  const generate = () => {
    dispatch(createGenerateMessages(id, "promptId1234"));
  };

  useEffect(() => {
    if (!messages && !messagesIsLoading) {
      generate();
    }
  }, []);

  if (messagesError) {
    return (
      <Retry
        status={messagesError}
        onRetry={generate}
        noRetryMessage="Unable to generate messages."
      />
    );
  }

  if (!messages || messagesIsLoading) {
    return <Loading />;
  }

  return <ProspectMessages {...messages} onRegenerate={generate} />;
};

export default ProspectMessagesContainer;
