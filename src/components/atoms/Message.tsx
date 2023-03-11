import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";

interface MessageProps {
  text: string;
}

const Message = ({ text }: MessageProps) => {
  const [showCopied, setShowCopied] = useState(false);

  const onCopy = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      <button className="text-left group border p-2">
        <div>{text}</div>
        <div className="h-4">
          {showCopied ? (
            <>Copied!</>
          ) : (
            <div className="hidden group-hover:block">Click to copy</div>
          )}
        </div>
      </button>
    </CopyToClipboard>
  );
};

export default Message;
