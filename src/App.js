import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/navbar";
import home from "./components/pages/home";
import quiz from "./components/pages/quiz";
import forum from "./components/pages/forum";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>
          <Router>
            <Navbar />
            <Route path="/" exact component={home} />
            <Route path="/quiz" component={quiz} />
            <Route path="/forum" component={forum} />
          </Router>
        </>
      </header>
    </div>
  );
}

export default App;
