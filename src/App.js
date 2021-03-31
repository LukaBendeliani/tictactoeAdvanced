import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Game from "./pages/GamePage/Game.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Route path="/" component={Game} exact />
      </Router>
    </div>
  );
};

export default App;
