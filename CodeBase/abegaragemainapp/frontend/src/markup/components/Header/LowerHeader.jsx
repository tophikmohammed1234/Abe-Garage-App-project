import React from "react";
import classes from "./header.module.css";
import Header_image from "./image/Header_image.png";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

function LowerHeader() {
  return (
    <div className={classes.lower_header}>
      <nav className={classes.Header_navbar}>
        <div className={classes.Header_container}>
          <div className={classes.Header_image}>
            <Link to="/">
              <img src={Header_image} alt="Header_image" />
            </Link>

            <p className={classes.all}>
            <IoMdMenu />
            All
          </p>
          </div>
          
          <ul className={classes.Header_nav}>
            <li className={classes.Header_item}>
              <Link to="/" className={classes.Header_link}>
                home
              </Link>
            </li>
            <li className={classes.Header_item}>
              <Link to="/about" className={classes.Header_link}>
                about us
              </Link>
            </li>
            <li className={classes.Header_item}>
              <Link to="/services" className={classes.Header_link}>
                services
              </Link>
            </li>
            <li className={classes.Header_item}>
              <Link to="/contact" className={classes.Header_link}>
                contact us
              </Link>
            </li>
            <li className={`${classes.Header_item} ${classes.push_right}`}>
              <Link to="/admin" className={classes.Header_link}>
                admin
              </Link>
            </li>
            <div className={classes.border_right}></div>
            <li className={classes.Header_item}>
              <Link to="/login" className={classes.Header_link_sign}>
                sign in
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default LowerHeader;
