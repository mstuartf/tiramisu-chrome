import React, { useState } from "react";
import Btn from "../atoms/Btn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/slice";
import { selectUser, selectUserIsLoading } from "../../redux/user/selectors";
import Loading from "../molecules/Loading";
import packageJson from "../../../package.json";
import RefreshBtn from "../atoms/RefreshBtn";
import { createFetchUser } from "../../redux/user/actions";
import SelectModel from "../molecules/SelectModel";
import { useHistory } from "react-router-dom";
import IconButton from "../atoms/IconButton";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import H from "../atoms/H";

const Account = () => {
  const dispatch = useDispatch();
  let history = useHistory();

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
    <div>
      <div className="flex items-center gap-2 mb-4">
        {history.length > 1 ? (
          <IconButton onClick={() => history.goBack()}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <IconButton to="/prospect">
            <ChevronLeftIcon />
          </IconButton>
        )}
        <H>Settings</H>
      </div>
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
        {/*{admin && <TeamContainer />}*/}
      </div>
    </div>
  );
};

export default Account;
