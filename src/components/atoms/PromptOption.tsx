import React from "react";
import { useSelector } from "react-redux";
import {
  createSelectPrompt,
  selectPromptIds,
} from "../../redux/prompts/selectors";

const PromptOption = ({ id }: { id: string }) => {
  const { name } = useSelector(createSelectPrompt(id));
  return <option value={id}>{name}</option>;
};

export default PromptOption;
