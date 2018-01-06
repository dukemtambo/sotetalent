import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SubscribeForm from "../../forms/SubscribeForm";

const HomePageMain = () => (
  <div className="main ">
    <div className="section text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-10 ml-auto mr-auto">
            <h2 className="title">Why Sote Talent</h2>
            <h5 className="description">
              Sote Talent is a crowd-investment platform that matches investors
              to early stage startups and talented people with business ideas.
              It guides them through a common journey to business success, while
              applying blockchain technology with smart contract to make the
              deals transparent and fair, and Artificial Intelligence in
              learning and financial literacy to help startups excel and
              progress.
            </h5>
            <br />
            <Link to="/about" className="btn btn-danger btn-round">
              See Details
            </Link>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3">
            <div className="info">
              <div className="icon icon-danger">
                <i className="nc-icon nc-album-2" />
              </div>
              <div className="description">
                <h4 className="info-title">Startup Cofounders</h4>
                <p className="description">
                  Register your business idea, earn your first Sote Coin and set
                  your fundraise for investment in equity.
                </p>
                <Link to="/about" className="btn btn-link btn-danger">
                  See more
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info">
              <div className="icon icon-danger">
                <i className="nc-icon nc-bulb-63" />
              </div>
              <div className="description">
                <h4 className="info-title">Investors</h4>
                <p>
                  Register as an Investor and get proffesional insights about
                  the best startups to invest in.
                </p>
                <Link to="/about" className="btn btn-link btn-danger">
                  See more
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info">
              <div className="icon icon-danger">
                <i className="nc-icon nc-chart-bar-32" />
              </div>
              <div className="description">
                <h4 className="info-title">Customers</h4>
                <p>
                  The best performing startups get to sell to their customers
                  directly through the platform.
                </p>
                <Link to="/about" className="btn btn-link btn-danger">
                  See more
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info">
              <div className="icon icon-danger">
                <i className="nc-icon nc-sun-fog-29" />
              </div>
              <div className="description">
                <h4 className="info-title">Innovation Companies</h4>
                <p>
                  This is for companies intrested in new ideas and solutions
                  through hackatons and bootcamps.
                </p>
                <Link to="/about" className="btn btn-link btn-danger">
                  See more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="section section-dark section-nucleo-icons">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <h2 className="title">Sote Talent In Action</h2>
            <br />
            <p className="description">
              Watch Geoffrey, the founder of{" "}
              <a
                href="http://elimupi.com"
                rel="noreferrer noopener"
                target="_blank"
              >
                ElimuPi
              </a>. He helps young people and teachers learn to code and
              transform their lives with computational thinking within 20 hours.
              He talks about how they use the Sote Talent platform to make
              smarter business decisions and investments.
            </p>
            <br />
            <button
              type="button"
              className="btn btn-outline-danger btn-round"
              data-toggle="modal"
              data-target="#videoModal"
            >
              <i className="fa fa-play" />Watch video
            </button>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="icons-container">
              <i className="nc-icon nc-time-alarm" />
              <i className="nc-icon nc-atom" />
              <i className="nc-icon nc-camera-compact" />
              <i className="nc-icon nc-watch-time" />
              <i className="nc-icon nc-key-25" />
              <i className="nc-icon nc-diamond" />
              <i className="nc-icon nc-user-run" />
              <i className="nc-icon nc-layout-11" />
              <i className="nc-icon nc-badge" />
              <i className="nc-icon nc-bulb-63" />
              <i className="nc-icon nc-favourite-28" />
              <i className="nc-icon nc-planet" />
              <i className="nc-icon nc-tie-bow" />
              <i className="nc-icon nc-zoom-split" />
              <i className="nc-icon nc-cloud-download-93" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Logos of Current Startups */}
    {/* <div className="section section-dark">
      <div className="container">
        <div className="row">
          <div className="col-md-8 ml-auto mr-auto text-center">
            <h2 className="title">Completed with examples</h2>
            <p className="description">
              The kit comes with three pre-built pages to help you get started
              faster. You can change the text and images and youre good to go.
              More importantly, looking at them will give you a picture of
              what you can built with this powerful kit.
            </p>
          </div>
        </div>
      </div>
    </div> */}
    <div className="section landing-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8 ml-auto mr-auto">
            <h2 className="text-center">Join Beta?</h2>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </div>
    <Footer />

    <div
      className="modal fade"
      id="videoModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="videoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div>
            <iframe
              title="Elimupi Video"
              width="100%"
              height="415"
              src="https://www.youtube.com/embed/1mAZAoZGJFA"
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePageMain;
