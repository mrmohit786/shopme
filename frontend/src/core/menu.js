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
  <nav className="container-nav sticky-top">
    <div className="nav-logo">
      <a>ShopME</a>
    </div>

    <div className="nav-menu">
      <ul>
        <li>
          <Link style={currentTab(history, "/")} to="/">
            <i className="mr-1 fas fa-home"></i>
            HOME
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li>
            <Link
              to="/user/dashboard"
              style={currentTab(history, "/user/dashboard")}
            >
              <i className="mr-1 fas fa-user"></i>
              DASHBOARD
            </Link>
          </li>
        )}
        <li>
          <Link style={currentTab(history, "/cart")} to="/cart">
            <i className="mr-1 fas fa-shopping-cart"></i>
            CART
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li>
            <Link
              to="/admin/dashboard"
              style={currentTab(history, "/admin/dashboard")}
            >
              <i className="align-self-center mr-1 fas fa-user-cog"></i>
              ADMIN
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li>
              <Link to="/signup" style={currentTab(history, "/signup")}>
                <i className="mr-1 fas fa-user-plus"></i>
                SIGNUP
              </Link>
            </li>

            <li>
              <Link to="/signin" style={currentTab(history, "/signin")}>
                <i className="mr-1 fas fa-sign-in-alt"></i>
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
              <i class="fas fa-sign-out-alt"></i> SIGNOUT
            </span>
          </li>
        )}
      </ul>
    </div>
  </nav>
);

export default withRouter(Menu);
