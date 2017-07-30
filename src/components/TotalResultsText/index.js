import React, { Component } from "react";
import Store from "../../stores/Store";

export default class TotalResultsText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      query: this.props.query
    });

    Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        totalFound: pictographsStore.totalFound
      });
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      query: newProps.query
    });
  }

  render() {
    return (
      <p className="pc-search--results-message">
        {this.state.totalFound} results for {this.state.query}
      </p>
    );
  }
}
