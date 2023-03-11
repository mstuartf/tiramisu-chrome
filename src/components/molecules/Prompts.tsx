import React from "react";
import { Prompt } from "../../redux/prompts/types";

const Prompts = ({ prompts }: { prompts: Prompt[] }) => (
  <div>
    {prompts.map(({ id, name, text }) => (
      <div key={id}>
        <div>{name}</div>
        <div>{text}</div>
      </div>
    ))}
  </div>
);

export default Prompts;
