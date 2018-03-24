import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";

class SubscribeForm extends React.Component {
  state = {
    data: {
      name: "",
      email: "",
    },
    loading: false,
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
      <form className="invite-form form-inline" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div
              className={
                errors.email ? "input-group has-danger" : "input-group"
              }
            >
              <span className="input-group-addon">
                <i className="nc-icon nc-single-02" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Joe Doe"
                name="name"
                value={data.name}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className={
                errors.email ? "input-group has-danger" : "input-group"
              }
            >
              <span className="input-group-addon">
                <i className="nc-icon nc-email-85" />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="example@example.com"
                name="email"
                value={data.email}
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 ml-auto mr-auto">
            <button className="btn btn-danger btn-md btn-fill">
              Send Invite
            </button>
          </div>
        </div>
      </form>
    );
  }
}
SubscribeForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
export default SubscribeForm;
