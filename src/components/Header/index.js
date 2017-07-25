import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header className="pc-header pc-container">
        <div className="pc-header--wrapper pc-container--content">
          <h1 className="pc-header--logo">
            <a className="pc-header--logo-link" href="/">
              PictograpiCollaborate
            </a>
          </h1>
          <nav className="pc-header--navigation">
            <a className="pc-header--navigation-link" href="">
              Register
            </a>
            <a className="pc-header--navigation-link" href="">
              Login
            </a>
          </nav>
        </div>
      </header>
    );
  }
}
