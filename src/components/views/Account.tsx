import React from "react";
import Btn from "../atoms/Btn";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/slice";

const Account = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Btn onClick={onLogout}>Logout</Btn>
    </div>
  );
};

export default Account;
