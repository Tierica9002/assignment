import React from "react";
import ReactDOM from "react-dom";
import 'whatwg-fetch'

import App from "./components/App";
import { AppProviders } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
