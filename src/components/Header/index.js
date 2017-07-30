import React, { Component } from "react";
import { auth } from "firebase";
import swal from "sweetalert2";
import Store from "../../stores/Store";
import { setUser, removeUser } from "../../stores/User";

export default class Header extends Component {
  /**
   * Signs in a user.
   * 
   * @memberof Header
   */
  async signIn() {
    let result, token, user;
    const provider = new auth.FacebookAuthProvider();

    try {
      result = await auth().signInWithPopup(provider);
      Store.dispatch(
        setUser(
          result.credential.accessToken,
          result.user.email,
          result.user.displayName,
          result.user.photoURL
        )
      );
      swal(`Hi ${result.additionalUserInfo.profile.first_name}!`);
    } catch (error) {
      swal(
        "Oops!",
        "An error occurred with your login, try again please.",
        "error"
      );
    }
  }

  /**
   * Signs out current user.
   * 
   * @memberof Header
   */
  async singOut() {
    await auth().signOut();
    Store.dispatch(removeUser());
  }

  /**
   * Loads user data from Store.
   * 
   * @memberof Header
   */
  loadUserData() {
    const userState = Store.getState().user;

    this.setState({
      isLoggedIn: userState.isLoggedIn,
      photo: userState.photo
    });
  }

  componentWillMount() {
    this.loadUserData();
    Store.subscribe(() => this.loadUserData());
  }

  render() {
    return (
      <header className="pc-header pc-container">
        <div className="pc-header--wrapper pc-container--content">
          <h1 className="pc-header--logo">
            <a className="pc-header--logo-link" href="/">
              PictograpiCollaborate
            </a>
          </h1>
          <div className="pc-header--menu">
            <nav className="pc-header--navigation">
              {!this.state.isLoggedIn &&
                <a className="pc-header--navigation-link" onClick={this.signIn}>
                  Sign in
                </a>}
              {this.state.isLoggedIn &&
                <a
                  className="pc-header--navigation-link"
                  onClick={this.singOut}
                >
                  Sing out
                </a>}
              <a
                className="pc-header--navigation-link"
                href="http://pictograpi.com/#contact"
              >
                Contact Us
              </a>
            </nav>
            {this.state.isLoggedIn &&
              <img className="pc-header--photo" src={this.state.photo} />}
          </div>
        </div>
      </header>
    );
  }
}
