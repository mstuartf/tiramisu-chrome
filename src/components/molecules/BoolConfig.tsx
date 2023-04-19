import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import Chckbx from "../atoms/ChckBox";
import { createPatchUser } from "../../redux/user/actions";
import { User } from "../../redux/user/types";

const BoolConfig = ({ prop, label }: { prop: keyof User; label: string }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)!;

  const [localActivated, setLocalActivated] = useState(!!user[prop]);

  useEffect(() => {
    setLocalActivated(!!user[prop]);
  }, [user[prop]]);

  const patch = (value: boolean) => {
    setLocalActivated(value);
    dispatch(createPatchUser({ [prop]: value }));
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div>{label}</div>
      <Chckbx isChecked={localActivated} onChange={patch} />
    </div>
  );
};

export default BoolConfig;
