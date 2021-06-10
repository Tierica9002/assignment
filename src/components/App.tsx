import React from "react";
import { useMutation } from "react-query";
import { client } from "../utils/api-client";
import "../assets/output.css";

const App = (): JSX.Element => {
  const { data, mutate } = useMutation(() => {
    return client("tokens", {
      data: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
    });
  });

  console.log(data);

  React.useEffect(() => {
    mutate();
  }, []);

  return <h1 className="text-2xl">NordSec App... {process.env.API_URL}</h1>;
};

export default App;
