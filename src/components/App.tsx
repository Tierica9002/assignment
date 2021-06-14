import React from "react";
import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import "../assets/output.css";
import LoginScreen from "../screens/Login/Login";
import ServerExplorer from "../screens/ServerExplorer/ServerExplorer";
import AuthRoute from "../utils/AuthRoute";
import Dashboard from "./Dashboard";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/server-explorer" />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <AuthRoute path="/server-explorer">
          <Dashboard>
            <ServerExplorer />
          </Dashboard>
        </AuthRoute>
      </Switch>
    </Router>
  );
};

export default App;
