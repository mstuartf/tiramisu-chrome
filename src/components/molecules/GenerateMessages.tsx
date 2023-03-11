import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPromptIds,
  selectSelectedPrompt,
} from "../../redux/prompts/selectors";
import PromptOption from "../atoms/PromptOption";
import { selectPrompt } from "../../redux/prompts/slice";

const GenerateMessages = ({ onGenerate }: { onGenerate: () => void }) => {
  const dispatch = useDispatch();
  const promptIds = useSelector(selectPromptIds);
  const selectedPromptId = useSelector(selectSelectedPrompt);
  const onChange = (id: string) => {
    dispatch(selectPrompt(id));
  };
  return (
    <div className="grid">
      <div>
        Prompt {selectedPromptId}:
        <select onChange={({ target: { value } }) => onChange(value)}>
          {promptIds!.map((id) => (
            <PromptOption id={id} key={id} selected={id === selectedPromptId} />
          ))}
        </select>
      </div>
      <button onClick={onGenerate}>GENERATE</button>
    </div>
  );
};

export default GenerateMessages;
