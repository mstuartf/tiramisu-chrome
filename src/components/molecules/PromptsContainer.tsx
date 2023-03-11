import React from "react";
import { useSelector } from "react-redux";
import { selectPromptIds } from "../../redux/prompts/selectors";
import Prompts from "./Prompts";

const PromptsContainer = () => {
  const promptIds = useSelector(selectPromptIds);

  if (!promptIds) {
    return <>Loading...</>;
  }

  return <Prompts ids={promptIds} />;
};

export default PromptsContainer;
