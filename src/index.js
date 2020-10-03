import React from "react";
import ReactDOM from "react-dom";
// import global css before individual component css overrides
import "./assets/css/global.css";
import Firebase, { FirebaseProvider } from "components/Firebase";
import App from "./components/App/App";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider value={new Firebase()}>
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
