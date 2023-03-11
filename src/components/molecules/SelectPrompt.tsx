import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPromptIds,
  selectSelectedPrompt,
} from "../../redux/prompts/selectors";
import PromptOption from "../atoms/PromptOption";
import { selectPrompt } from "../../redux/prompts/slice";
import Slct from "../atoms/Slct";

const SelectPrompt = () => {
  const dispatch = useDispatch();
  const promptIds = useSelector(selectPromptIds);
  const selectedPromptId = useSelector(selectSelectedPrompt);
  const onChange = (id: string) => {
    dispatch(selectPrompt(id));
  };
  return (
    <div>
      <Slct onChange={onChange}>
        {promptIds!.map((id) => (
          <PromptOption id={id} key={id} selected={id === selectedPromptId} />
        ))}
      </Slct>
    </div>
  );
};

export default SelectPrompt;
