import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <div className="pc-search">
        <h1 className="pc-search--title">
          Find over 350.000 pictographs in different languages
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
