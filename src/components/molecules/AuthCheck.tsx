import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/user/selectors";

const AuthCheck = ({
  children,
  authRequired,
}: {
  children: React.ReactNode;
  authRequired: boolean;
}) => {
  const isLoggedIn = useSelector(selectAuth);

  if (!isLoggedIn && authRequired) {
    return <Redirect to="/login" />;
  }

  if (isLoggedIn && !authRequired) {
    return <Redirect to="/prospect" />;
  }

  return <>{children}</>;
};

export default AuthCheck;
