import React from "react";
import Btn from "../atoms/Btn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/slice";
import { selectUser } from "../../redux/user/selectors";
import Loading from "../molecules/Loading";
import TeamContainer from "../molecules/TeamContainer";
import packageJson from "../../../package.json";

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
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <div>You are currently running version {packageJson.version}.</div>
        <Btn onClick={onLogout}>Logout</Btn>
      </div>
      {admin && <TeamContainer />}
    </div>
  );
};

export default Account;
