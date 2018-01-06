import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav
    className="navbar navbar-expand-lg fixed-top navbar-transparent"
    color-on-scroll="300"
  >
    <div className="container">
      <div className="navbar-translate">
        <Link className="navbar-brand" to="/">
          Sote Talent
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right navbar-burger"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-bar" />
          <span className="navbar-toggler-bar" />
          <span className="navbar-toggler-bar" />
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarToggler">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          {/* <li className="nav-item">
            <a href="/get-engaged" className="nav-link">
              Get Engaged
            </a>
          </li> */}
          <li className="nav-item">
            <Link to="/competition" className="nav-link">
              Competition
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="btn btn-danger btn-round">
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;
