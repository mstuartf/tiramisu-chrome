import React, { useState } from "react";
import Btn from "../atoms/Btn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/slice";
import { selectUser, selectUserIsLoading } from "../../redux/user/selectors";
import Loading from "../molecules/Loading";
import TeamContainer from "../molecules/TeamContainer";
import packageJson from "../../../package.json";
import MsgTracking from "../molecules/MsgTracking";
import RefreshBtn from "../atoms/RefreshBtn";
import { createFetchUser } from "../../redux/user/actions";
import SelectModel from "../molecules/SelectModel";

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserIsLoading);

  const [update, setUpdate] = useState("No updates found.");
  const [isChecking, setIsChecking] = useState(false);

  const onLogout = () => {
    dispatch(logout());
  };

  const refresh = () => {
    dispatch(createFetchUser());
  };

  const checkForUpdates = () => {
    setIsChecking(true);
    chrome.runtime.requestUpdateCheck(function (status) {
      setIsChecking(false);
      if (status === "update_available") {
        setUpdate("Update pending...");
      } else if (status === "no_update") {
        setUpdate("No update found.");
      } else if (status === "throttled") {
        setUpdate("Please try again later.");
      }
    });
  };

  if (!user || isLoading) {
    return <Loading />;
  }

  const { admin, email } = user;

  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <div>{email}</div>
        <RefreshBtn onClick={refresh} />
      </div>
      <div className="flex justify-between items-center">
        <div>You are currently running version {packageJson.version}.</div>
        <Btn onClick={onLogout}>Logout</Btn>
      </div>
      <div className="flex justify-between items-center">
        <div>{update}</div>
        <Btn onClick={checkForUpdates} disabled={isChecking}>
          Check for updates
        </Btn>
      </div>
      <SelectModel />
      <MsgTracking />
      {admin && <TeamContainer />}
    </div>
  );
};

export default Account;
