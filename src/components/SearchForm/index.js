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
        className="ps-search-form"
        onSubmit={event => this.handleSubmit(event)}
      >
        <div className="field has-addons has-addons-centered">
          <div className="control">
            <input
              className="input is-large"
              type="text"
              placeholder="Find in Pictograpi"
              value={this.state.query}
              onChange={event => this.handleQueryEntry(event)}
            />
          </div>
          <div className="control">
            <a
              className="button is-warning is-large"
              onClick={event => this.handleSubmit(event)}
            >
              Search in{" "}
              <i className="ps-search-form--flag flag-icon flag-icon-es" />
            </a>
          </div>
        </div>
      </form>
    );
  }
}
