import React from "react";
import { useSelector } from "react-redux";
import { createSelectPrompt } from "../../redux/prompts/selectors";

const PromptOption = ({ id, selected }: { id: string; selected: boolean }) => {
  const { name } = useSelector(createSelectPrompt(id));
  return (
    <option value={id} selected={selected}>
      {name}
    </option>
  );
};

export default PromptOption;
