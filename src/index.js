import React from "react";
import ReactDOM from "react-dom";
// import global css before individual component css overrides
import "./assets/css/global.css";
import App from "./components/App/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
