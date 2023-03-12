import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Feedback from "../atoms/Feedback";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";

const AddTeamMember = () => {
  const { company } = useSelector(selectUser)!;
  const url = `${process.env.REACT_APP_BACKEND_URL}/accounts/signup/${company}`;
  const [showCopied, setShowCopied] = useState(false);

  const onCopy = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <CopyToClipboard text={url} onCopy={onCopy}>
      <button className="flex items-center justify-between text-left group border p-2 rounded shadow text-gray-600 hover:bg-gray-100 hover:scale-[1.02] transition ease-in duration-300">
        <div>Share invite link</div>
        <div>{showCopied && <Feedback>Copied!</Feedback>}</div>
      </button>
    </CopyToClipboard>
  );
};

export default AddTeamMember;
