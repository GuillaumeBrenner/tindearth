import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import LangSelector from "../components/LangSelector/LangSelector";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Tindearth</span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Acceuil
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/quiz"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Forum
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/forum"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Quiz
              </NavLink>
            </li>

            <div className="language">
              <LangSelector />
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
