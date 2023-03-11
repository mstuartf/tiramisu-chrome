import React from "react";
import SelectPrompt from "./SelectPrompt";
import Btn from "../atoms/Btn";

const GenerateMessages = ({ onGenerate }: { onGenerate: () => void }) => {
  return (
    <div className="grid">
      <SelectPrompt />
      <Btn onClick={onGenerate}>GENERATE</Btn>
    </div>
  );
};

export default GenerateMessages;
