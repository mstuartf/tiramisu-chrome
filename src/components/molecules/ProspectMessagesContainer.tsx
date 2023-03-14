import React from "react";
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
import { selectSelectedPrompt } from "../../redux/prompts/selectors";
import SelectPrompt from "./SelectPrompt";
import Btn from "../atoms/Btn";
import Spinner from "../atoms/Spinner";

const ProspectMessagesContainer = () => {
  const dispatch = useDispatch();
  const messagesIsLoading = useSelector(selectProspectMessagesIsLoading);
  const messages = useSelector(selectProspectMessages);
  const messagesError = useSelector(selectProspectMessagesError);
  const prompt_id = useSelector(selectSelectedPrompt);
  const profile = useSelector(selectProspectProfile);

  const generate = () => {
    dispatch(createGenerateMessages({ profile, prompt_id }));
  };

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
        <SelectPrompt />
        <Btn onClick={generate} disabled={messagesIsLoading}>
          {!!messages ? "Regenerate" : "Generate"}
        </Btn>
      </div>
      <div className="py-4">
        {messagesIsLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>{!!messages ? <ProspectMessages {...messages} /> : null}</>
        )}
      </div>
    </div>
  );
};

export default ProspectMessagesContainer;
