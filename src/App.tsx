import React from "react";
import "./App.css";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import Prospect from "./components/views/Prospect";
import Prompts from "./components/views/Prompts";

const history = createMemoryHistory();

function App() {
  return (
    <div className="w-full h-full px-8 py-6">
      <div className="h-full w-full">
        <Router history={history}>
          <Switch>
            <Route path="/prospect">
              <Prospect />
            </Route>
            <Route path="/prompts">
              <Prompts />
            </Route>
            <Route path="*">
              <Redirect to="/prospect" />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
