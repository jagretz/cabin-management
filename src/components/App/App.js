import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Greetings <code>{process.env.REACT_APP_USERNAME}</code>! It is an
          honor to meet you.
        </p>
      </header>
    </div>
  );
}

export default App;
