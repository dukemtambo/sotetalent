import React from "react";
import bimage from "../../../assets/img/banner.jpg";
import foglow from "../../../assets/img/fog-low.png";
import clouds from "../../../assets/img/clouds.png";

const Banner = () => (
  <div
    className="page-header section-dark"
    style={{ backgroundImage: `url(${bimage})` }}
  >
    <div className="filter" />
    <div className="content-center">
      <div className="container">
        <div className="title-brand">
          <h1 className="presentation-title">Sote Talent</h1>
          <div className="fog-low">
            <img src={foglow} alt="" />
          </div>
          <div className="fog-low right">
            <img src={foglow} alt="" />
          </div>
        </div>
        <h2 className="presentation-subtitle text-center">
          Find the talent to invest in or get the job done using blockchain and
          AI.
        </h2>
      </div>
    </div>
    <div
      className="moving-clouds"
      style={{ backgroundImage: `url(${clouds})` }}
    />
  </div>
);

export default Banner;
