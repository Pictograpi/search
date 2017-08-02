import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header className="ps-header ps-container">
        <div className="ps-header--wrapper ps-container--content">
          <h1 className="ps-header--logo">
            <Link to="/" className="ps-header--logo-link">
              PictograpiSearch
            </Link>
          </h1>
          <div className="ps-header--menu">
            <nav className="ps-header--navigation">
              <a
                className="ps-header--navigation-link"
                href="http://pictograpi.com/#contact"
                target="_blank"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
