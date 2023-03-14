import React from "react";
import { MessageSet } from "../../redux/prospect/types";
import Message from "../atoms/Message";

const ProspectMessages = ({ messages }: MessageSet) => (
  <div className="grid gap-4">
    <div className="grid gap-4 mb-4">
      {messages.map(({ text, id }) => (
        <Message text={text} key={id} id={id} />
      ))}
    </div>
  </div>
);

export default ProspectMessages;
