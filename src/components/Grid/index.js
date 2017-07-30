import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  pictographsFetchLast,
  pictographsFetchTotal
} from "../../stores/Pictographs";
import queryString from "query-string";

export default class Grid extends Component {
  constructor() {
    super();
    this.state = {
      page: 0
    };
  }

  /**
   * Loads a given page.
   *
   * @param {any} pageToLoad
   * @memberof Grid
   */
  loadPage(pageToLoad) {
    if (pageToLoad !== this.state.page) {
      Store.dispatch(pictographsFetchLast(pageToLoad));
      this.setState({
        page: pageToLoad,
        pictographs: []
      });
    }
  }

  componentWillMount() {
    Store.dispatch(pictographsFetchLast(0));

    Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        pictographs: pictographsStore.last || [],
        total: pictographsStore.total
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
        <h1 className="pc-grid--title">Last pictographs included</h1>
        <div className="pc-container--content pc-grid--content">
          {(this.state.pictographs || []).map(pictogram => {
            return (
              <a
                key={pictogram.id}
                href={`pictogram?id=${pictogram.id}`}
                className="pc-grid--pic"
              >
                <img className="pc-grid--image" src={pictogram.url} />
              </a>
            );
          })}
        </div>
        <div className="pc-grid--pagination">
          {paginationButtons}
          <button
            className="pc-grid--pagination-item"
            onClick={() => this.loadPage(this.state.page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
