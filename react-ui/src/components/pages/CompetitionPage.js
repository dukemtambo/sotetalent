import React from "react";
// import { Link } from "react-router-dom";
import aboutHeaderImage from "../../assets/img/daniel-olahs.jpg";

const CompetitionPage = () => (
  <div className="wrapper">
    <div
      className="documentation page-header page-header-small"
      style={{ backgroundImage: `url(${aboutHeaderImage})` }}
    >
      <div className="filter" />
      <div className="motto text-center">
        <h2 className="title-uppercase">Innovation Talent Search</h2>
        <h3 className="text-center">
          High school students business idea competition.
        </h3>
        <br />
        <a href="" className="btn btn-outline-neutral btn-round">
          <i className="fa fa-play" />Watch video
        </a>
        <button
          type="button"
          className="btn btn-outline-neutral btn-round"
          style={{ marginLeft: "5px" }}
        >
          Join Competition
        </button>
      </div>
    </div>
  </div>
);

export default CompetitionPage;
