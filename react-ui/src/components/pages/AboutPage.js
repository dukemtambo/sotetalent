import React from "react";
import Footer from "./partials/Footer";
import aboutHeaderImage from "../../assets/img/daniel-olahs.jpg";

const AboutPage = () => (
  <div className="wrapper">
    <div
      className="documentation page-header page-header-small"
      style={{ backgroundImage: `url(${aboutHeaderImage})` }}
    >
      <div className="filter" />
      <div className="motto">
        <br />
      </div>
    </div>
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="tim-title">
              <h2>Sote Talent is rebuilding the startup world.</h2>
              <br />
            </div>
            <p style={{ fontSize: "18px" }}>
              Sote Talent was born in Kenya and wants to make the process of
              finding talent, learning new skills, starting business and doing
              business as easy as it gets.
            </p>
            <br />
            <p style={{ fontSize: "18px" }}>
              Sote Talent registers startups and talented people online on the
              blockchain and tracks their development and social impact.
            </p>
            <br />
            <p style={{ fontSize: "18px" }}>
              It provides them with a friendly guidance and services of personal
              AI assistant and qualified mentors. And nurtures their growth
              while connecting them to new customers and investors.
            </p>
            <br />
          </div>
          <div className="col-md-6" style={{ borderLeft: "1px solid #000" }}>
            <div className="tim-title">
              <h3>Contact Us</h3>
            </div>
            <p style={{ fontSize: "18px" }}>Want to get in touch?</p>
            <p style={{ fontSize: "18px" }}>
              <a href="mailto:info@sotetalent.com">Email Us</a>
            </p>
            <hr />
            <p style={{ fontSize: "18px" }}>SoteTalent Kenya (HQ)</p>
            <p style={{ fontSize: "18px" }}>P.O.BOX 900,</p>
            <p style={{ fontSize: "18px" }}>Red Elephant Bistro,</p>
            <p style={{ fontSize: "18px" }}>Voi.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="section section-dark text-center">
      <div className="container">
        <h2 className="title">Backed by a few investors and partners</h2>
      </div>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
