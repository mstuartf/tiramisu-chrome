import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../atoms/Btn";
import Inpt from "../atoms/Inpt";
import Spinner from "../atoms/Spinner";
import { selectInvitePending } from "../../redux/user/selectors";
import { createInviteUser } from "../../redux/user/actions";
import Chckbx from "../atoms/ChckBox";

const AddTeamMember = () => {
  const dispatch = useDispatch();

  const isSaving = useSelector(selectInvitePending);
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const onSave = () => {
    dispatch(createInviteUser({ email, admin }));
  };

  const onCancel = () => {
    setEmail("");
    setAdmin(false);
    setIsAdding(false);
  };

  useEffect(() => {
    if (isAdding && !isSaving) {
      onCancel();
    }
  }, [isSaving]);

  if (!isAdding) {
    return (
      <Btn onClick={() => setIsAdding(true)} disabled={isSaving}>
        add
      </Btn>
    );
  }

  return (
    <div className="grid gap-2">
      <Inpt
        value={email}
        onChange={setEmail}
        disabled={isSaving}
        placeholder="Enter the user's email address"
      />
      <label className="py-2 flex items-center cursor-pointer">
        <Chckbx isChecked={admin} onChange={setAdmin} />
        <span className="ml-2">Is this user an admin?</span>
      </label>
      <div className="flex justify-between items-center mt-2">
        <Btn disabled={isSaving} onClick={onCancel} kind="outline">
          cancel
        </Btn>
        {isSaving && <Spinner />}
        <Btn onClick={onSave} disabled={isSaving || !email}>
          save
        </Btn>
      </div>
    </div>
  );
};

export default AddTeamMember;
