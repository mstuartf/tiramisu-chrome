import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { createRecordCopy } from "../../redux/prospect/actions";
import { Message as Msg } from "../../redux/prospect/types";
import Feedback from "./Feedback";

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
      <button className="text-left group border p-2 rounded shadow text-gray-600 hover:bg-gray-100 hover:scale-[1.02] transition ease-in duration-300">
        <div>{text}</div>
        <div className="h-4 flex justify-end">
          {showCopied ? (
            <Feedback>Copied!</Feedback>
          ) : (
            <Feedback className="hidden group-hover:block">
              Click to copy
            </Feedback>
          )}
        </div>
      </button>
    </CopyToClipboard>
  );
};

export default Message;
