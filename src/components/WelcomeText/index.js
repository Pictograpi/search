import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  fetchTotalPictographs,
  fetchTotalImages
} from "../../stores/Pictographs";

import { fetchTotalLanguages } from "../../stores/Languages";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Store.dispatch(fetchTotalPictographs());
    Store.dispatch(fetchTotalImages());
    Store.dispatch(fetchTotalLanguages());

    this.unsuscribe = Store.subscribe(() => {
      this.setState({
        total: Store.getState().pictographs.total,
        totalImages: Store.getState().pictographs.totalImages,
        totalLanguages: Store.getState().languages.total
      });
    });
  }

  componentWillUnmount() {
    this.unsuscribe();
  }

  render() {
    return (
      <h1 className="title">
        We have {this.state.total} words, {this.state.totalImages} images and{" "}
        {this.state.totalLanguages} languages.
      </h1>
    );
  }
}
