import React from "react";
import { useSelector } from "react-redux";
import { selectPromptIds } from "../../redux/prompts/selectors";
import Prompts from "./Prompts";
import Loading from "./Loading";

const PromptsContainer = () => {
  const promptIds = useSelector(selectPromptIds);

  if (!promptIds) {
    return <Loading />;
  }

  return <Prompts ids={promptIds} />;
};

export default PromptsContainer;
