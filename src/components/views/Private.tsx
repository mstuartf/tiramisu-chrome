import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Prospect from "../../components/views/Prospect";
import Styles from "../../components/views/Styles";
import NavBar from "../../components/molecules/NavBar";
import { useDispatch } from "react-redux";
import { createListPrompts } from "../../redux/prompts/actions";
import Account from "./Account";
import { createFetchUser } from "../../redux/user/actions";

const Private = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // needed by both views, so dispatch here
    dispatch(createListPrompts());
    dispatch(createFetchUser());
  }, []);

  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="px-8 py-6">
        <Switch>
          <Route path="/prospect">
            <Prospect />
          </Route>
          <Route path="/styles">
            <Styles />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="*">
            <Redirect to="/prospect" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Private;
