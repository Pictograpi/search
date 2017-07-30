import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.query = "";
  }

  /**
   * Searches pictographs by the query introduced.
   *
   * @param {any} event
   * @memberof Search
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`search/${this.query}`);
  }

  handleQueryEntry(event) {
    this.query = event.target.value;
  }

  render() {
    return (
      <form className="pc-search" onSubmit={event => this.handleSubmit(event)}>
        <input
          type="text"
          placeholder="What are you looking for?"
          onKeyUp={event => this.handleQueryEntry(event)}
        />
        <button type="button" onClick={event => this.handleSubmit(event)}>
          Find in Spanish
        </button>
      </form>
    );
  }
}
