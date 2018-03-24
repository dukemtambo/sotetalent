import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { resetPasswordRequest } from "../../actions/auth";
import LoginBackground from "../../assets/img/login-image.jpg";

class ForgotPasswordPage extends React.Component {
  state = {
    success: false,
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div className="wrapper">
        <div
          className="page-header"
          style={{ backgroundImage: `url(${LoginBackground})` }}
        >
          <div className="filter" />
          <div className="container">
            <div className="row">
              <div className="col-lg-4 ml-auto mr-auto">
                <div className="card card-register">
                  <h3 className="title">Recover Password</h3>
                  {this.state.success ? (
                    <div className="alert alert-info">Email has been sent.</div>
                  ) : (
                    <ForgotPasswordForm submit={this.submit} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired,
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
