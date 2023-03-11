import React from "react";
import Prompt from "../atoms/Prompt";
import AddPrompt from "./AddPrompt";

const Prompts = ({ ids }: { ids: string[] }) => (
  <>
    <div>Prompts</div>
    <div className="grid gap-2">
      {ids.map((id) => (
        <Prompt key={id} id={id} />
      ))}
    </div>
    <AddPrompt />
  </>
);

export default Prompts;
