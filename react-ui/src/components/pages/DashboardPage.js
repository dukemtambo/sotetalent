import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import DashboardSidebar from "../navigation/DashboardSidebar";
import DashboardNavigation from "../navigation/DashboardNavigation";
import "../../assets/css/DashboardApp.css";
import "../../assets/css/DashboardSidebar.css";

class DashboardPage extends React.Component {
  status = {};
  render() {
    const { isConfirmed } = this.props;
    return (
      <div className="wrapper">
        <DashboardSidebar />
        <div className="main-panel">
          <DashboardNavigation />
          <div className="container-fluid">
            {!isConfirmed && <ConfirmEmailMessage />}
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
  };
}

export default connect(mapStateToProps)(DashboardPage);
