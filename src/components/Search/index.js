import React, { Component } from "react";
import Store from "../../stores/Store";
import { pictographsFetchTotal } from "../../stores/Pictographs";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    Store.dispatch(pictographsFetchTotal());

    Store.subscribe(() =>
      this.setState({
        total: Store.getState().pictographs.total
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
