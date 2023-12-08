import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Forum } from "./components/Pages/Forum";
import { Quiz } from "./components/Pages/Quiz";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
