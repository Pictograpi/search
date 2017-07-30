import React, { Component } from "react";
import Store from "../../stores/Store";
import { pictogramsFetchTotal } from "../../stores/Pictograms";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    Store.dispatch(pictogramsFetchTotal());

    Store.subscribe(() =>
      this.setState({
        total: Store.getState().pictograms.total
      })
    );
  }

  render() {
    return (
      <div className="pc-search">
        <h1 className="pc-search--title">
          We have {this.state.total} pictographs in different languages.
        </h1>
        <form className="pc-search--form">
          <input type="text" id="searchterm" placeholder="what do you want ?" />
          <button type="button" id="search">
            Find
          </button>
        </form>
        <button className="pc-search--suggest" type="button" id="search">
          Suggest your own pictograph
        </button>
      </div>
    );
  }
}
