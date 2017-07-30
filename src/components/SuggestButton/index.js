import React, { Component } from "react";

export default class Suggest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button className="pc-suggest" type="button">
        Suggest your own pictograph
      </button>
    );
  }
}
