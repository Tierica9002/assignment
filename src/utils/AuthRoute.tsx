import React from "react";
import { Redirect, Route, RouteProps, useHistory } from "react-router";
import { useAuth } from "../context/auth-context";

const AuthRoute = (props: RouteProps): JSX.Element => {
  const { token } = useAuth();
  const history = useHistory();
  if (!token) {
    history.push("/login");
  }

  return <Route {...props} />;
};

export default AuthRoute;
