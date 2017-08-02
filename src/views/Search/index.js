import React, { Component } from "react";
import SearchForm from "../../components/SearchForm";
import TotalResultsText from "../../components/TotalResultsText";
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
      <div className="ps-container ps-search">
        <div className="ps-container--bg-title">
          <div className="ps-container--content">
            <SearchForm history={this.props.history} query={query} />
            <TotalResultsText query={query} />
          </div>
        </div>
        <div className="ps-container--content ps-search--results-wrapper">
          <Grid history={this.props.history} query={query} page={page} />
          <Pagination page={page} history={this.props.history} />
        </div>
      </div>
    );
  }
}
