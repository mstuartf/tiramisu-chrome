import React from "react";
import Btn from "../atoms/Btn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/slice";
import { selectUser } from "../../redux/user/selectors";
import Loading from "../molecules/Loading";

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return <Loading />;
  }

  const { admin } = user;

  return (
    <div>
      <div>This user is {admin ? "admin" : "not admin"}</div>
      <Btn onClick={onLogout}>Logout</Btn>
    </div>
  );
};

export default Account;
