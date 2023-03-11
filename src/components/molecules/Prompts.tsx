import React from "react";
import Prompt from "../atoms/Prompt";

const Prompts = ({ ids }: { ids: string[] }) => (
  <div className="grid gap-2">
    {ids.map((id) => (
      <Prompt key={id} id={id} />
    ))}
  </div>
);

export default Prompts;
