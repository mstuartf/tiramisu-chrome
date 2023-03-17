import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Prospect from "../../components/views/Prospect";
import Templates from "./Templates";
import NavBar from "../../components/molecules/NavBar";
import { useDispatch } from "react-redux";
import { createListTemplates } from "../../redux/templates/actions";
import Account from "./Account";
import { createFetchUser } from "../../redux/user/actions";

const Private = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // needed by both views, so dispatch here
    dispatch(createListTemplates());
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
          <Route path="/templates">
            <Templates />
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
