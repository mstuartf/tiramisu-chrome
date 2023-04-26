import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Prospect from "../../components/views/Prospect";
import Templates from "./Templates";
import { useDispatch, useSelector } from "react-redux";
import { createListTemplates } from "../../redux/templates/actions";
import Account from "./Account";
import { createFetchUser } from "../../redux/user/actions";
import Loading from "../molecules/Loading";
import { selectUser } from "../../redux/user/selectors";
import { selectTemplatesLoaded } from "../../redux/templates/selectors";
import LinkedInTracking from "./LinkedInTracking";

const Private = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)!;
  const templatesLoaded = useSelector(selectTemplatesLoaded)!;

  useEffect(() => {
    // needed by both views, so dispatch here
    if (!templatesLoaded) {
      dispatch(createListTemplates());
    }
    if (!user) {
      dispatch(createFetchUser());
    }
  }, []);

  if (!user) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-6">
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
        <Route path="/tracking">
          <LinkedInTracking />
        </Route>
        <Route path="*">
          <Redirect to="/prospect" />
        </Route>
      </Switch>
    </div>
  );
};

export default Private;
