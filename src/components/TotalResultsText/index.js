import React, { Component } from "react";
import Store from "../../stores/Store";

export default class TotalResultsText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Store.subscribe(() => {
      // TODO: Add total results.
    });
  }

  render() {
    return (
      <p className="pc-search--results-message">
        98.700.000 results for {this.props.query}
      </p>
    );
  }
}
