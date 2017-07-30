import React, { Component } from "react";
import SearchForm from "../../components/SearchForm";
import Grid from "../../components/Grid";
import Store from "../../stores/Store";
import WelcomeText from "../../components/WelcomeText";
import SuggestButton from "../../components/SuggestButton";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pc-home">
        <WelcomeText />
        <SearchForm history={this.props.history} />
        <SuggestButton />
      </div>
    );
  }
}
