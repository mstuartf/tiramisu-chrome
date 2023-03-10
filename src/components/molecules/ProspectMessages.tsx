import React from "react";
import { MessageSet } from "../../redux/prospect/types";

const ProspectMessages = ({
  messages,
  onRegenerate,
}: MessageSet & { onRegenerate: () => void }) => (
  <div>
    {messages.map(({ text }) => (
      <div key={text}>{text}</div>
    ))}
    <div>
      <button onClick={onRegenerate}>regenerate</button>
    </div>
  </div>
);

export default ProspectMessages;
