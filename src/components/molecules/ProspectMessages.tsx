import React from "react";
import { MessageSet } from "../../redux/prospect/types";
import Message from "../atoms/Message";
import SelectPrompt from "./SelectPrompt";

const ProspectMessages = ({
  messages,
  onRegenerate,
}: MessageSet & { onRegenerate: () => void }) => (
  <div>
    <div className="grid gap-4 mb-4">
      {messages.map(({ text, id }) => (
        <Message text={text} key={id} id={id} />
      ))}
    </div>
    <div>
      <SelectPrompt />
      <button onClick={onRegenerate}>regenerate</button>
    </div>
  </div>
);

export default ProspectMessages;
