import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header className="ps-header">
        <div className="container">
          <nav className="navbar ps-header--navbar">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item ps-header--logo">
                PictograpiSearch{" "}
                <span className="ps-header--logo__beta">(beta)</span>
              </Link>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <a
                  className="navbar-item ps-header--navigation-item"
                  href="http://pictograpi.com/#contact"
                  target="_blank"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
