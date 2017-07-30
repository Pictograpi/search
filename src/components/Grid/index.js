import React, { Component } from "react";
import Store from "../../stores/Store";
import { pictographsFetchLast } from "../../stores/Pictographs";
import queryString from "query-string";

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
  loadPage(pageToLoad) {}

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
            {this.state.found > 24 &&
              <div className="pc-grid--pagination">
                {paginationButtons}
                <button
                  className="pc-grid--pagination-item"
                  onClick={() => this.loadPage(this.state.page + 1)}
                >
                  Next
                </button>
              </div>}
          </div>}
      </div>
    );
  }
}
