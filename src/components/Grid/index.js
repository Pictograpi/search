import React, { Component } from "react";
import Store from "../../stores/Store";
import { pictographsSearch } from "../../stores/Pictographs";
import Pagination from "../Pagination";

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  /**
   * Loads a given page.
   *
   * @param {any} pageToLoad
   * @memberof Grid
   */
  loadPage(pageToLoad) {
    this.setState({
      page: pageToLoad
    });
    Store.dispatch(pictographsSearch(this.state.query, pageToLoad));
  }

  handleClickImage(event, id) {
    event.preventDefault();
    this.props.history.push(`/pictograph/${id}`);
  }

  componentWillMount() {
    Store.dispatch(pictographsSearch(this.props.query, 0));

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
    Store.dispatch(pictographsSearch(nextProps.query, 0));
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
        <Pagination />
      </div>
    );
  }
}
