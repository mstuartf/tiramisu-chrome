import React from "react";
import { useSelector } from "react-redux";
import { selectPromptIds } from "../../redux/prompts/selectors";
import PromptOption from "../atoms/PromptOption";

const GenerateMessages = ({ onGenerate }: { onGenerate: () => void }) => {
  const promptIds = useSelector(selectPromptIds);
  return (
    <div className="grid">
      <div>
        Prompt:
        <select>
          {promptIds!.map((id) => (
            <PromptOption id={id} key={id} />
          ))}
        </select>
      </div>
      <button onClick={onGenerate}>GENERATE</button>
    </div>
  );
};

export default GenerateMessages;
