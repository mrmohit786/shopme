import React, { Fragment } from "react";
import Menu from "../core/menu";

//BASE FUCTION TO CREATE NAVBAR AND FOOTER IN ALL PAGE
const Base = ({
  title = "My Title",
  description = "My Description",
  className = "text-white",
  children,
}) => (
  <Fragment>
    <Menu />
    <div className="jumbotron banner text-white text-center mb-0 p-4">
      <h2 className=" display-3"> {title} </h2>
      <p className="lead"> {description} </p>
    </div>

    <div className={className}> {children} </div>
    <footer className="container-footer">
      <div className="footer-details">
        <ul>
          <li>ABOUT US</li>
          <li>CONTACT US</li>
        </ul>
      </div>
      <div className="footer-socials">
        <ul>
          <li>SOCIAL</li>
          <li>|</li>
          <li>
            <i className="fab fa-instagram-square"></i>
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-twitter-square"></i>
          </li>
        </ul>
      </div>
    </footer>
  </Fragment>
);

export default Base;
