import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import { validateToken, resetPassword } from "../../actions/auth";
import LoginBackground from "../../assets/img/login-image.jpg";

class ResetPasswordPage extends React.Component {
  state = {
    loading: true,
    success: false,
  };

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  submit = data =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push("/login"));

  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;

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
                  <h3 className="title">Set New Password</h3>
                  {loading && <div className="alert alert-info">Loading</div>}
                  {!loading &&
                    success && (
                      <ResetPasswordForm submit={this.submit} token={token} />
                    )}
                  {!loading &&
                    !success && (
                      <div className="alert alert-danger">
                        Invalid Token. Try to{" "}
                        <Link to="/forgot_password">recover password</Link>{" "}
                        again.
                      </div>
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

ResetPasswordPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { validateToken, resetPassword })(
  ResetPasswordPage,
);
