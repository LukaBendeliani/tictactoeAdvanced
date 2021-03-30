import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Settings from "./pages/SettingsPage/Settings.jsx";
import Game from "./pages/GamePage/Game.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Route path="/" component={Settings} exact />
        <Route path="/game" component={Game} exact />
      </Router>
    </div>
  );
};

export default App;
