import React from "react";
import { MessageSet } from "../../redux/prospect/types";
import Message from "../atoms/Message";
import GenerateMessages from "./GenerateMessages";

const ProspectMessages = ({
  messages,
  onRegenerate,
}: MessageSet & { onRegenerate: () => void }) => (
  <div className="grid gap-4">
    <GenerateMessages onGenerate={onRegenerate} />
    <div className="grid gap-4 mb-4">
      {messages.map(({ text, id }) => (
        <Message text={text} key={id} id={id} />
      ))}
    </div>
  </div>
);

export default ProspectMessages;
