import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { createRecordCopy } from "../../redux/prospect/actions";
import { Message as Msg } from "../../redux/prospect/types";

const Message = ({ text, id }: Msg) => {
  const dispatch = useDispatch();

  const [showCopied, setShowCopied] = useState(false);

  const onCopy = () => {
    dispatch(createRecordCopy(id));
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
