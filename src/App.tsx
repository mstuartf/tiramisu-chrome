import React from "react";
import "./App.css";
import { createMemoryHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import Login from "./components/views/Login";
import AuthCheck from "./components/molecules/AuthCheck";
import Private from "./components/views/Private";
import CacheManager from "./components/molecules/CacheManager";

const history = createMemoryHistory();

function App() {
  return (
    <CacheManager>
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
    </CacheManager>
  );
}

export default App;
