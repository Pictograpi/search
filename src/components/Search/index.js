import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  pictographsFetchTotal,
  pictographsSearch
} from "../../stores/Pictographs";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {};
  }

  /**
   * Searches pictographs by the query introduced.
   *
   * @param {any} event
   * @memberof Search
   */
  handleSubmit(event) {
    event.preventDefault();
    Store.dispatch(pictographsSearch(this.state.query, 0));
  }

  /**
   * Adds to the state the value of the query while typing.
   *
   * @param {any} event
   * @memberof Search
   */
  handleChangeQuery(event) {
    this.setState({
      query: event.target.value
    });
  }

  componentWillMount() {
    Store.dispatch(pictographsFetchTotal());

    Store.subscribe(() =>
      this.setState({
        total: Store.getState().pictographs.total
      })
    );
  }

  render() {
    return (
      <div className="pc-search">
        <h1 className="pc-search--title">
          We have {this.state.total} pictographs in different languages.
        </h1>
        <form
          className="pc-search--form"
          onSubmit={event => this.handleSubmit(event)}
        >
          <input
            type="text"
            id="searchterm"
            placeholder="What are you looking for?"
            value={this.state.query}
            onChange={event => this.handleChangeQuery(event)}
          />
          <button
            type="button"
            id="search"
            onClick={event => this.handleSubmit(event)}
          >
            Find in Spanish
          </button>
        </form>
        <button className="pc-search--suggest" type="button" id="search">
          Suggest your own pictograph
        </button>
      </div>
    );
  }
}
