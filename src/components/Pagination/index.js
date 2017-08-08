import Store from "../../stores/Store";
import React, { Component } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: Number.parseInt(props.page || 0),
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
    const paginationButtons = [];
    const isNextShown =
      (this.state.page === 0 && this.state.totalFound > 30) ||
      this.state.totalFound / 30 >= this.state.page + 1;
    const isPreviousShown = this.state.page > 0;
    let isSelected, i;

    for (i = 0; i <= this.state.page; i++) {
      isSelected = this.state.page === i;

      paginationButtons.push(
        <li key={i}>
          <Link
            to={{
              pathname: this.state.pathname,
              search: `?page=${i}`
            }}
            className={`pagination-link ${isSelected && "is-current"}`}
          >
            {i + 1}
          </Link>
        </li>
      );
    }

    return (
      <div className="ps-pagination container">
        <nav className="pagination is-centered">
          {isPreviousShown &&
            <Link
              to={{
                pathname: this.state.pathname,
                search: `?page=${this.state.page - 1}`
              }}
              className="pagination-previous"
            >
              Previous page
            </Link>}
          {isNextShown &&
            <Link
              className="pagination-next"
              to={{
                pathname: this.state.pathname,
                search: `?page=${this.state.page + 1}`
              }}
            >
              Next page
            </Link>}
          <ul className="pagination-list">
            {paginationButtons}
          </ul>
        </nav>
      </div>
    );
  }
}
