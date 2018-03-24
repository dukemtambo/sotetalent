import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupForm from "../forms/SignupForm";
import { signup } from "../../actions/users";
import LoginBackground from "../../assets/img/login-image.jpg";

class SignupPage extends React.Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div className="wrapper">
        <div
          className="page-header"
          style={{ backgroundImage: `url(${LoginBackground})` }}
        >
          <div className="filter" />
          <div className="container" style={{ height: "100vh" }}>
            <div className="row" style={{ height: "100vh" }}>
              <div className="col-lg-4 ml-auto mr-auto">
                <div className="card card-register">
                  <h3 className="title">Join SoteTalent</h3>
                  <SignupForm submit={this.submit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signup: PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignupPage);
