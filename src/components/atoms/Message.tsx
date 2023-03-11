import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface MessageProps {
  text: string;
}

const Message = ({ text }: MessageProps) => {
  return (
    <CopyToClipboard text={text} onCopy={() => {}}>
      <button className="text-left">{text}</button>
    </CopyToClipboard>
  );
};

export default Message;
