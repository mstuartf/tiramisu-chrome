import React from "react";
import "./App.css";
import { Link, Redirect, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import Prospect from "./components/views/Prospect";
import Prompts from "./components/views/Prompts";
import NavBar from "./components/molecules/NavBar";

const history = createMemoryHistory();

function App() {
  return (
    <div className="w-full h-full">
      <div className="h-full w-full">
        <Router history={history}>
          <NavBar />
          <div className="px-8 py-6">
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
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
