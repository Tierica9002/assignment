import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../context/auth-context";

const AuthRoute = (props: RouteProps): JSX.Element => {
  const { token } = useAuth();
  if (!token) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

export default AuthRoute;
