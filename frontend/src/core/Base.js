import React from "react";
import Menu from "../core/menu";

//BASE FUCTION TO CREATE NAVBAR AND FOOTER IN ALL PAGE
const Base = ({
  title = "My Title",
  description = "My Description",
  className = "text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron banner text-white text-center">
        <h2 className=" display-4"> {title} </h2>
        <p className="lead"> {description} </p>
      </div>
      <div className={className}> {children} </div>
    </div>

    <footer class="container-footer">
      <div class="footer-details">
        <ul>
          <li>ABOUT US</li>
          <li>CONTACT US</li>
        </ul>
      </div>
      <div class="footer-socials">
        <ul>
          <li>SOCIAL</li>
          <li>|</li>
          <li>
            <i class="fab fa-instagram-square"></i>
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-twitter-square"></i>
          </li>
        </ul>
      </div>
    </footer>
  </div>
);

export default Base;
