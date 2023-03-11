import React from "react";
import SelectPrompt from "./SelectPrompt";
import Btn from "../atoms/Btn";

const GenerateMessages = ({ onGenerate }: { onGenerate: () => void }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SelectPrompt />
      <Btn onClick={onGenerate}>GENERATE</Btn>
    </div>
  );
};

export default GenerateMessages;
