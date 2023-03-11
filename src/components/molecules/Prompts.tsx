import React from "react";
import Prompt from "../atoms/Prompt";
import AddPrompt from "./AddPrompt";

const Prompts = ({ ids }: { ids: string[] }) => (
  <div className="grid gap-4">
    <div className="pb-2 border-b uppercase">Message styles</div>
    <div className="grid gap-2">
      {ids.map((id) => (
        <Prompt key={id} id={id} />
      ))}
    </div>
    <AddPrompt />
  </div>
);

export default Prompts;
