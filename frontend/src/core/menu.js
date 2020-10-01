import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

//CHANGE COLOR OF CURRENT OPEN LINK
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#3399ff" };
  } else {
    return { color: "#000000" };
  }
};

//NAVBAR MENU
const Menu = ({ history }) => (
  <div className="container-fluid">
    <nav className="container-nav fixed-top">
      <div className="nav-logo">
        <a>ShopME</a>
      </div>
      <div className="nav-search">
        <input type="search" placeholder="What are you looking for?" />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="nav-menu">
        <ul>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li>
              <Link
                to="/user/dashboard"
                style={currentTab(history, "/user/dashboard")}
              >
                "Profile"
              </Link>
            </li>
          )}

          <li>
            <Link style={currentTab(history, "/")} to="/">
              HOME
            </Link>
          </li>
          <li>
            <Link style={currentTab(history, "/cart")} to="/cart">
              CART
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li>
              <Link
                to="/admin/dashboard"
                style={currentTab(history, "/admin/dashboard")}
              >
                ADMINISTRATION
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <li>
                <Link to="/signup" style={currentTab(history, "/signup")}>
                  SIGNUP
                </Link>
              </li>

              <li>
                <Link to="/signin" style={currentTab(history, "/signin")}>
                  SIGNIN
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-menu__signout">
              <span
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                SIGNOUT
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  </div>
);

export default withRouter(Menu);
