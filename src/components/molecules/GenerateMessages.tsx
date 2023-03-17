import React from "react";
import SelectTemplate from "./SelectTemplate";
import Btn from "../atoms/Btn";

const GenerateMessages = ({
  onGenerate,
  btnText,
}: {
  btnText: string;
  onGenerate: () => void;
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SelectTemplate />
      <Btn onClick={onGenerate}>{btnText}</Btn>
    </div>
  );
};

export default GenerateMessages;
