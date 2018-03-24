import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import gravatarUrl from "gravatar-url";
// Gravatar Brings up error during build
import * as actions from "../../actions/auth";

class DashboardNavigation extends React.Component {
  state = {};
  render() {
    const { user, logout } = this.props;
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-translate">
            <Link className="navbar-brand" to="#pablo">
              {" "}
            </Link>
            <button
              href=""
              className="navbar-toggler navbar-toggler-right navbar-burger"
              type="button"
              data-toggle="collapse"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-bar burger-lines" />
              <span className="navbar-toggler-bar burger-lines" />
              <span className="navbar-toggler-bar burger-lines" />
            </button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navigation"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  {/* <img
                    className="img-fluid rounded-circle"
                    src={gravatarUrl(user.email, { size: 30 })}
                    alt="Gravatar"
                  />{" "} */}
                  {user.username}
                  <b className="caret" />
                </Link>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/settings">
                      <i className="fa fa-cogs" /> Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={() => logout()} to="">
                      <i className="fa fa-sign-out" /> Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

DashboardNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { logout: actions.logout }, null, {
  pure: false,
})(DashboardNavigation);
