import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../../components/SearchForm";
import Grid from "../../components/Grid";
import Pagination from "../../components/Pagination";
import queryString from "query-string";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const query = this.props.history.location.pathname.substr(
      this.props.history.location.pathname.lastIndexOf("/") + 1
    );
    const page = queryString.parse(this.props.history.location.search).page;

    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container has-text-centered">
              <SearchForm history={this.props.history} query={query} />
            </div>
          </div>
        </section>
        <div className="section">
          <nav
            className="container breadcrumb is-small"
            aria-label="breadcrumbs"
          >
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="is-active">
                <Link to={this.props.history.location}>Results</Link>
              </li>
            </ul>
          </nav>
          <Grid history={this.props.history} query={query} page={page} />
          <Pagination page={page} history={this.props.history} />
        </div>
      </div>
    );
  }
}
