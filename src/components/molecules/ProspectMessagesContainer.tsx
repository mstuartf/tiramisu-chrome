import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProspectMessages,
  selectProspectMessagesIsLoading,
  selectProspectProfile,
} from "../../redux/prospect/selectors";
import { createGenerateMessages } from "../../redux/prospect/actions";
import ProspectMessages from "./ProspectMessages";

const ProspectMessagesContainer = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(selectProspectProfile)!;
  const messagesIsLoading = useSelector(selectProspectMessagesIsLoading);
  const messages = useSelector(selectProspectMessages);

  const generate = () => {
    dispatch(createGenerateMessages(id, "promptId1234"));
  };

  useEffect(() => {
    generate();
  }, []);

  if (!messages || messagesIsLoading) {
    return <>Loading...</>;
  }

  return <ProspectMessages {...messages} />;
};

export default ProspectMessagesContainer;
