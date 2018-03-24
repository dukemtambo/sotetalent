import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";
import LoginBackground from "../../assets/img/login-image.jpg";

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

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
                  <h3 className="title">Welcome Back</h3>
                  <div className="social-line text-center">
                    <a
                      href="#facebook"
                      className="btn btn-neutral btn-facebook btn-just-icon"
                    >
                      <i className="fa fa-facebook-square" />
                    </a>
                    <a
                      href="#twitter"
                      className="btn btn-neutral btn-twitter btn-just-icon"
                      style={{ marginLeft: "5px" }}
                    >
                      <i className="fa fa-twitter" />
                    </a>
                  </div>
                  <LoginForm submit={this.submit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginPage);
