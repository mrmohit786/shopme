import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import "./menu.css";

//CHANGE COLOR OF CURRENT OPEN LINK
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000000" };
  } else {
    return { color: "#FFFFFF" };
  }
};

//NAVBAR MENU
const Menu = ({ history }) => (
  <div className="">
    <ul className="nav nav-tabs bg-info navbar-expand-md fixed-top">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item ">
        <Link
          style={currentTab(history, "/cart")}
          to="/cart"
          className="nav-link"
        >
          Cart
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item ">
          <Link
            to="/user/dashboard"
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
          >
            "Profile"
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item ">
          <Link
            to="/admin/dashboard"
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
          >
            Admin Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              to="/signup"
              style={currentTab(history, "/signup")}
              className="nav-link"
            >
              Signup
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/signin"
              style={currentTab(history, "/signin")}
              className="nav-link"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
