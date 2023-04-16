import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessagesLoadingState,
  selectProspectMessages,
  selectProspectProfile,
} from "../../redux/prospect/selectors";
import { createGenerateMessages } from "../../redux/prospect/actions";
import SelectTemplate from "./SelectTemplate";
import Btn from "../atoms/Btn";
import {
  selectSelectedTemplate,
  selectTemplateIds,
} from "../../redux/templates/selectors";
import { Link } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const DraftMsgsContainer = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectProspectMessages);
  const isLoading = useSelector(selectMessagesLoadingState);
  const template_id = useSelector(selectSelectedTemplate);
  const profile = useSelector(selectProspectProfile);
  const templateIds = useSelector(selectTemplateIds);

  const generate = () => {
    dispatch(createGenerateMessages({ profile, template_id }));
  };

  if (!templateIds?.length) {
    return (
      <div className="border rounded p-3 text-gray-400 flex gap-2">
        <InformationCircleIcon className="h-8 w-8 text-blue-600" />
        <div>
          To draft a personalised message to this prospect, please create a{" "}
          <Link
            className="text-blue-400 hover:text-blue-500 hover:underline transition duration-300 ease-in-out"
            to="/templates"
          >
            Message Template
          </Link>
          .
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <SelectTemplate />
      <Btn onClick={generate} disabled={isLoading}>
        {!!messages ? "Re-draft" : "Draft messages"}
      </Btn>
    </div>
  );
};

export default DraftMsgsContainer;
