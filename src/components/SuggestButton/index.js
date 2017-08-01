import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

export default class Suggest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Redirects the user to the contact form if needed.
   *
   * @memberof Suggest
   */
  async handleClick() {
    await swal(
      "You will be redirected to our main contact form.<br><br>Leave us your suggestion and we will contact you to request more information.<br><br>Thanks!"
    );
    window.open("http://pictograpi.com/#contact");
  }

  render() {
    return (
      <button
        onClick={event => this.handleClick(event)}
        className="pc-button pc-suggest-button"
      >
        Suggest a pictograph
      </button>
    );
  }
}
