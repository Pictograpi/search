import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query
    };
  }

  /**
   * Searches pictographs by the query introduced.
   *
   * @param {any} event
   * @memberof Search
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/search/${this.state.query}`);
  }

  /**
   * Updates state when input is changed.
   *
   * @param {any} event
   * @memberof Search
   */
  handleQueryEntry(event) {
    this.setState({
      query: event.target.value
    });
  }

  render() {
    return (
      <form
        className="pc-search-form"
        onSubmit={event => this.handleSubmit(event)}
      >
        <input
          type="text"
          placeholder="What are you looking for?"
          value={this.state.query}
          onChange={event => this.handleQueryEntry(event)}
        />
        <button type="button" onClick={event => this.handleSubmit(event)}>
          Find in Spanish
        </button>
      </form>
    );
  }
}
