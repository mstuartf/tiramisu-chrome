import React from "react";
import SelectPrompt from "./SelectPrompt";

const GenerateMessages = ({ onGenerate }: { onGenerate: () => void }) => {
  return (
    <div className="grid">
      <SelectPrompt />
      <button onClick={onGenerate}>GENERATE</button>
    </div>
  );
};

export default GenerateMessages;
