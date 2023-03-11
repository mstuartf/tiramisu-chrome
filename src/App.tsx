import React, { useEffect } from "react";
import "./App.css";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import Prospect from "./components/views/Prospect";
import Styles from "./components/views/Styles";
import NavBar from "./components/molecules/NavBar";
import { useDispatch } from "react-redux";
import { createListPrompts } from "./redux/prompts/actions";

const history = createMemoryHistory();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // needed by both views, so dispatch here
    dispatch(createListPrompts());
  }, []);
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
              <Route path="/styles">
                <Styles />
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
