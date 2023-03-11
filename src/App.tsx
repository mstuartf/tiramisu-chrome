import React, { useEffect } from "react";
import "./App.css";
import { createMemoryHistory } from "history";
import { useDispatch, useSelector } from "react-redux";
import { readToken } from "./cache";
import { setToken } from "./redux/user/slice";
import { selectTokenLoaded } from "./redux/user/selectors";
import { Route, Router, Switch } from "react-router-dom";
import Login from "./components/views/Login";
import AuthCheck from "./components/molecules/AuthCheck";
import Private from "./components/views/Private";

const history = createMemoryHistory();

function App() {
  const dispatch = useDispatch();
  const tokenLoaded = useSelector(selectTokenLoaded);

  useEffect(() => {
    dispatch(setToken(readToken()));
  }, []);

  if (!tokenLoaded) {
    return <>Loading...</>;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path="/login">
          <AuthCheck authRequired={false}>
            <Login />
          </AuthCheck>
        </Route>
        <Route path="/*">
          <AuthCheck authRequired={true}>
            <Private />
          </AuthCheck>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
