import React, { Component } from "react";
import SearchForm from "../../components/SearchForm";
import TotalResultsText from "../../components/TotalResultsText";
import Grid from "../../components/Grid";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const query = this.props.history.location.pathname.substr(
      this.props.history.location.pathname.lastIndexOf("/") + 1
    );

    return (
      <div className="pc-container pc-search">
        <div className="pc-search--form-wrapper">
          <div className="pc-container--content">
            <SearchForm history={this.props.history} query={query} />
            <TotalResultsText query={query} />
            <Grid history={this.props.history} query={query} />
          </div>
        </div>
      </div>
    );
  }
}
