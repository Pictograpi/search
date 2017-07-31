import Store from "../../stores/Store";
import React, { Component } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadState(page) {
    this.setState({
      page: Number.parseInt(page || 0),
      pathname: this.props.history.location.pathname
    });
  }

  componentWillMount() {
    this.loadState(this.props.page);

    Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        totalFound: pictographsStore.totalFound
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.loadState(nextProps.page);
  }

  render() {
    let paginationButtons = [],
      isNextShown =
        (this.state.page === 0 && this.state.totalFound > 25) ||
        this.state.totalFound / 25 >= this.state.page + 1;

    for (let i = 0; i <= this.state.page; i++) {
      let isSelected = this.state.page === i;

      // "pc-grid--pagination-item__selected"
      paginationButtons.push(
        <Link
          to={{
            pathname: this.state.pathname,
            search: `?page=${i}`
          }}
          className={`pc-button pc-pagination--item ${isSelected &&
            "pc-pagination--item__selected"}`}
          key={i}
        >
          {i + 1}
        </Link>
      );
    }

    return (
      <div className="pc-pagination">
        {paginationButtons}
        {isNextShown &&
          <Link
            className="pc-button pc-pagination--item"
            to={{
              pathname: this.state.pathname,
              search: `?page=${this.state.page + 1}`
            }}
          >
            Next
          </Link>}
      </div>
    );
  }
}
