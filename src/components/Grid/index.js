import React, { Component } from "react";
import Store from "../../stores/Store";
import { pictographsSearch } from "../../stores/Pictographs";

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClickImage(event, id) {
    event.preventDefault();
    this.props.history.push(`/pictograph/${id}`);
  }

  componentWillMount() {
    this.setState({ page: this.props.page });

    Store.dispatch(pictographsSearch(this.props.query, this.props.page));

    Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        found: pictographsStore.found
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      found: []
    });
    Store.dispatch(pictographsSearch(nextProps.query, nextProps.page));
  }

  render() {
    const pictographElements = (this.state.found || []).map(pictograph => {
      return (
        <a
          key={pictograph.pictographId}
          onClick={event => this.handleClickImage(event, pictograph.id)}
          className="pc-grid--pic"
        >
          <img className="pc-grid--image" src={pictograph.url} />
        </a>
      );
    });

    return (
      <div className="pc-grid">
        <div className="pc-grid--content">
          {pictographElements}
        </div>
      </div>
    );
  }
}
