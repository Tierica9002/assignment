import React from "react";
import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import "../assets/output.css";
import LoginScreen from "../screens/Login";
import ServerExplorer from "../screens/ServerExplorer";
import AuthRoute from "../utils/AuthRoute";

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
          <ServerExplorer />
        </AuthRoute>
      </Switch>
    </Router>
  );
};

export default App;
