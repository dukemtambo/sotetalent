import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false }),
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {errors.global && (
          <div className="alert alert-danger">{errors.global}</div>
        )}

        <div className={errors.email ? "form-group has-danger" : "form-group"}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={this.onChange}
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div
          className={errors.password ? "form-group has-danger" : "form-group"}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={this.onChange}
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-round">
          Login
        </button>
        <div className="forgot">
          <Link to="/forgot_password" className="btn btn-link btn-default">
            Forgot password?
          </Link>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
