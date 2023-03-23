import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessagesLoadingState,
  selectProspectMessages,
  selectProspectMessagesError,
  selectProspectMessageSetId,
  selectProspectMessagesIsLoading,
  selectProspectMessagesProcessed,
  selectProspectProfile,
} from "../../redux/prospect/selectors";
import {
  createFetchMessageSet,
  createGenerateMessages,
} from "../../redux/prospect/actions";
import ProspectMessages from "./ProspectMessages";
import Retry from "../atoms/Retry";
import { selectSelectedTemplate } from "../../redux/templates/selectors";
import SelectTemplate from "./SelectTemplate";
import Btn from "../atoms/Btn";
import LoadingPercent from "./LoadingPercent";

const ProspectMessagesContainer = () => {
  const dispatch = useDispatch();
  const messagesIsLoading = useSelector(selectProspectMessagesIsLoading);
  const messages = useSelector(selectProspectMessages);
  const messageSetId = useSelector(selectProspectMessageSetId);
  const messagesError = useSelector(selectProspectMessagesError);
  const messagesProcessed = useSelector(selectProspectMessagesProcessed);
  const template_id = useSelector(selectSelectedTemplate);
  const profile = useSelector(selectProspectProfile);
  const isLoading = useSelector(selectMessagesLoadingState);

  const generate = () => {
    dispatch(createGenerateMessages({ profile, template_id }));
  };

  useEffect(() => {
    if (
      !!messageSetId &&
      !messagesProcessed &&
      !messagesIsLoading &&
      !messagesError
    ) {
      setTimeout(() => {
        dispatch(createFetchMessageSet(messageSetId));
      }, 3000);
    }
  }, [messagesProcessed, messagesIsLoading, messagesError, messageSetId]);

  if (messagesError) {
    return (
      <Retry
        status={messagesError}
        onRetry={generate}
        noRetryMessage="Unable to generate messages."
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <SelectTemplate />
        <Btn onClick={generate} disabled={isLoading}>
          {!!messages ? "Re-draft" : "Draft messages"}
        </Btn>
      </div>
      <div className="py-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingPercent seconds={30} />
          </div>
        ) : (
          <>{!!messages ? <ProspectMessages {...messages} /> : null}</>
        )}
      </div>
    </div>
  );
};

export default ProspectMessagesContainer;
