import React, { Component } from "react";
import Store from "../../stores/Store";
import { fetchCountByQuery } from "../../stores/Pictographs";

export default class TotalResultsText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query
    };
  }

  componentWillMount() {
    Store.dispatch(fetchCountByQuery(this.props.query));

    this.unsuscribe = Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        totalFound: pictographsStore.countByQuery
      });
    });
  }

  componentWillReceiveProps(newProps) {
    Store.dispatch(fetchCountByQuery(newProps.query));

    this.setState({
      query: newProps.query
    });
  }

  componentWillUnmount() {
    this.unsuscribe();
  }

  render() {
    return (
      <p className="ps-search--results-message">
        {this.state.totalFound} results for {this.state.query}
      </p>
    );
  }
}
