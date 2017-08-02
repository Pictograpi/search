import React, { Component } from "react";
import Store from "../../stores/Store";
import { fetchTotalPictographs } from "../../stores/Pictographs";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Store.dispatch(fetchTotalPictographs());

    this.unsuscribe = Store.subscribe(() => {
      this.setState({
        total: Store.getState().pictographs.total
      });
    });
  }

  componentWillUnmount() {
    this.unsuscribe();
  }

  render() {
    return (
      <h1 className="ps-welcome-text">
        We have {this.state.total} pictographs in different languages.
      </h1>
    );
  }
}
