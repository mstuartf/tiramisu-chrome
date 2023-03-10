import React from "react";
import { MessageSet } from "../../redux/prospect/types";

const ProspectMessages = ({ messages }: MessageSet) => (
  <div>
    {messages.map(({ text }) => (
      <div key={text}>{text}</div>
    ))}
  </div>
);

export default ProspectMessages;
