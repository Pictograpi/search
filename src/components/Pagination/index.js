import React, { Component } from "react";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let paginationButtons = [];

    for (let i = 0; i <= this.state.page; i++) {
      // "pc-grid--pagination-item__selected"
      paginationButtons.push(
        <button
          className="pc-grid--pagination-item"
          key={i}
          onClick={() => this.loadPage(i)}
        >
          {i === 0 ? "First" : i}
        </button>
      );
    }

    return (
      <div className="pc-pagination">
        {paginationButtons}
        <button
          className="pc-pagination--item"
          onClick={() => this.loadPage(this.state.page + 1)}
        >
          Next
        </button>
      </div>
    );
  }
}
