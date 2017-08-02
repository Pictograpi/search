import Store from "../../stores/Store";
import React, { Component } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      pathname: props.history.location.pathname
    };
  }

  componentWillMount() {
    this.unsubscribe = Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        totalFound: pictographsStore.countByQuery
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: Number.parseInt(nextProps.page || 0),
      pathname: nextProps.history.location.pathname
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let paginationButtons = [],
      isNextShown =
        (this.state.page === 0 && this.state.totalFound > 25) ||
        this.state.totalFound / 25 >= this.state.page + 1;

    for (let i = 0; i <= this.state.page; i++) {
      let isSelected = this.state.page === i;

      // "ps-grid--pagination-item__selected"
      paginationButtons.push(
        <Link
          to={{
            pathname: this.state.pathname,
            search: `?page=${i}`
          }}
          className={`ps-button ps-pagination--item ${isSelected &&
            "ps-pagination--item__selected"}`}
          key={i}
        >
          {i + 1}
        </Link>
      );
    }

    return (
      <div className="ps-pagination">
        {paginationButtons}
        {isNextShown &&
          <Link
            className="ps-button ps-pagination--item"
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
