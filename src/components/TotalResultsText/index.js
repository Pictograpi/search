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
    const isQueryUpdated = this.state.query !== newProps.query;

    if (isQueryUpdated) {
      Store.dispatch(fetchCountByQuery(newProps.query));

      this.setState({
        query: newProps.query
      });
    }
  }

  componentWillUnmount() {
    this.unsuscribe();
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">
          {this.state.totalFound} results found for "{this.state.query}"
        </h1>
      </div>
    );
  }
}
