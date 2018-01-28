import React from "react";
import aboutHeaderImage from "../../assets/img/daniel-olahs.jpg";

const StartupPage = () => (
  <div className="wrapper">
    <div
      className="documentation page-header page-header-small"
      style={{ backgroundImage: `url(${aboutHeaderImage})` }}
    >
      <div className="filter" />
    </div>
  </div>
);

export default StartupPage;
