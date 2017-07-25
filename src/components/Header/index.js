import React, { Component } from "react";
import { auth } from "firebase";
import swal from "sweetalert2";

export default class Header extends Component {
  /**
   * Launches the login flow.
   * 
   * @memberof Header
   */
  async doLogin() {
    let result, token, user;
    const provider = new auth.FacebookAuthProvider();

    try {
      result = await auth().signInWithPopup(provider);
      token = result.credential.accessToken;
      user = result.user;

      swal("You're logged in!");
    } catch (error) {
      swal(
        "Oops!",
        "An error occurred with your login, try again please.",
        "error"
      );
    }
  }

  /**
   * Renders the component.
   * 
   * @returns {JSX} JSX code.
   * @memberof Header
   */
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
            <a className="pc-header--navigation-link" onClick={this.doLogin}>
              Login
            </a>
            <a
              className="pc-header--navigation-link"
              href="http://pictograpi.com/#contact"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </header>
    );
  }
}
