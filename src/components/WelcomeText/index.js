import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  fetchTotalPictographs,
  fetchTotalImages
} from "../../stores/Pictographs";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Store.dispatch(fetchTotalPictographs());
    Store.dispatch(fetchTotalImages());

    this.unsuscribe = Store.subscribe(() => {
      this.setState({
        total: Store.getState().pictographs.total,
        totalImages: Store.getState().pictographs.totalImages
      });
    });
  }

  componentWillUnmount() {
    this.unsuscribe();
  }

  render() {
    return (
      <h1 className="title">
        We have {this.state.total} words and {this.state.totalImages} images.
      </h1>
    );
  }
}
