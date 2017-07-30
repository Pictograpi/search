import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  pictographsFetchLast,
  pictographsSearch
} from "../../stores/Pictographs";
import queryString from "query-string";

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      totalFound: 0
    };
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

  componentWillMount() {
    Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        found: pictographsStore.found,
        totalFound: pictographsStore.totalFound,
        query: pictographsStore.query
      });
    });
  }

  render() {
    const showNextButton =
      (this.state.page === 0 && this.state.totalFound > 24) ||
      this.state.totalFound / ((this.state.page + 1) * 24) >= 1;
    const showPagination = this.state.totalFound > 24;
    let paginationButtons = [];

    for (let i = 0; i <= this.state.page; i++) {
      const isPageSelected = i === this.state.page;

      paginationButtons.push(
        <button
          className={`pc-grid--pagination-item ${isPageSelected &&
            "pc-grid--pagination-item__selected"}`}
          key={i}
          onClick={() => this.loadPage(i)}
        >
          {i === 0 ? "First" : i}
        </button>
      );
    }

    return (
      <div className="pc-container pc-grid">
        {this.state.found &&
          <div className="pc-grid--wrapper">
            <h1 className="pc-grid--title">
              {this.state.totalFound} pictographs found for "{this.state.query}"
            </h1>
            <div className="pc-container--content pc-grid--content">
              {this.state.found.map(pictograph => {
                return (
                  <a
                    key={pictograph.pictographId}
                    href={`pictograph?id=${pictograph.id}`}
                    className="pc-grid--pic"
                  >
                    <img className="pc-grid--image" src={pictograph.url} />
                  </a>
                );
              })}
            </div>
            {showPagination &&
              <div className="pc-grid--pagination">
                {paginationButtons}
                {showNextButton &&
                  <button
                    className="pc-grid--pagination-item"
                    onClick={() => this.loadPage(this.state.page + 1)}
                  >
                    Next
                  </button>}
              </div>}
          </div>}
      </div>
    );
  }
}
