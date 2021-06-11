import React from "react";
import { client } from "../utils/api-client";
import { useAuth } from "../context/auth-context";

const ServerExplorer = () => {
  const { token } = useAuth();
  React.useEffect(() => {
    client("servers", { token }).then((response: Response) => response.json());
    console.log(token);
  }, []);

  return <h1>server explorer</h1>;
};

export default ServerExplorer;
