import React from "react";
import { MessageSet } from "../../redux/prospect/types";
import Message from "../atoms/Message";

const ProspectMessages = ({
  messages,
  onRegenerate,
}: MessageSet & { onRegenerate: () => void }) => (
  <div>
    {messages.map(({ text }) => (
      <Message text={text} key={text} />
    ))}
    <div>
      <button onClick={onRegenerate}>regenerate</button>
    </div>
  </div>
);

export default ProspectMessages;
