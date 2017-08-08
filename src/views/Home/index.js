import React, { Component } from "react";
import SearchForm from "../../components/SearchForm";
import Grid from "../../components/Grid";
import Store from "../../stores/Store";
import WelcomeText from "../../components/WelcomeText";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="hero is-primary is-large">
        <div className="hero-body">
          <div className="container has-text-centered">
            <WelcomeText />
            <SearchForm history={this.props.history} />
          </div>
        </div>
      </section>
    );
  }
}
