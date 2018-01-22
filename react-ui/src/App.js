import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import AboutPage from "./components/pages/AboutPage";
import CompetitionPage from "./components/pages/CompetitionPage";
import DashboardPage from "./components/pages/DashboardPage";
import SignupPage from "./components/pages/SignupPage";
import StartupPage from "./components/pages/StartupPage";
import MarketPage from "./components/pages/MarketPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import Navigation from "./components/navigation/Navigation";

const App = ({ location, isAuthenticated }) => (
  <div>
    {!isAuthenticated && <Navigation />}
    <GuestRoute location={location} path="/" exact component={HomePage} />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
    />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute location={location} path="/about" exact component={AboutPage} />
    <GuestRoute
      location={location}
      path="/competitions"
      exact
      component={CompetitionPage}
    />
    <GuestRoute
      location={location}
      path="/startups"
      exact
      component={StartupPage}
    />
    <GuestRoute
      location={location}
      path="/market"
      exact
      component={MarketPage}
    />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <GuestRoute
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
  };
}

export default connect(mapStateToProps)(App);
