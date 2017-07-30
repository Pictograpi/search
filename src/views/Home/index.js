import React, { Component } from "react";
import Search from "../../components/Search";
import Grid from "../../components/Grid";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <Grid />
      </div>
    );
  }
}
