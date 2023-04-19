import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import Chckbx from "../atoms/ChckBox";
import { createPatchUser } from "../../redux/user/actions";

const MsgTracking = () => {
  const dispatch = useDispatch();
  const { msg_tracking_activated, linkedin_tracking_enabled } =
    useSelector(selectUser)!;

  const [localActivated, setLocalActivated] = useState(
    !!msg_tracking_activated
  );

  useEffect(() => {
    setLocalActivated(!!msg_tracking_activated);
  }, [msg_tracking_activated]);

  const patch = (value: boolean) => {
    setLocalActivated(value);
    dispatch(createPatchUser({ msg_tracking_activated: value }));
  };

  if (!linkedin_tracking_enabled) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <div>Save LinkedIn message to CRM?</div>
      <Chckbx isChecked={localActivated} onChange={patch} />
    </div>
  );
};

export default MsgTracking;
