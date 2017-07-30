import React, { Component } from "react";
import Store from "../../stores/Store";
import { pictographsFetchTotal } from "../../stores/Pictographs";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Store.dispatch(pictographsFetchTotal());

    Store.subscribe(() => {
      this.setState({
        total: Store.getState().pictographs.total
      });
    });
  }

  render() {
    return (
      <h1 className="pc-welcome-text">
        We have {this.state.total} pictographs in different languages.
      </h1>
    );
  }
}
