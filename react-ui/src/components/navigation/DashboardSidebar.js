import React from "react";

const DashboardSidebar = () => (
  <div
    className="sidebar"
    data-background-color="white"
    data-active-color="danger"
  >
    <div className="sidebar-wrapper">
      <div className="logo">
        <a href="/dashboard" className="simple-text">
          Sote Talent
        </a>
      </div>

      <ul className="nav">
        <li className="nav-item active">
          <a className="nav-link" href="/dashboard">
            <i className="fa fa-tachometer" />
            <p>Dashboard</p>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/user">
            <i className="fa fa-user" />
            <p>User Profile</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default DashboardSidebar;
