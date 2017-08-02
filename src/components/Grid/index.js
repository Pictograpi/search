import React, { Component } from "react";
import Store from "../../stores/Store";
import { fetchPictographsByQuery } from "../../stores/Pictographs";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page
    };
  }

  handleClickImage(event, id) {
    event.preventDefault();
    this.props.history.push(`/pictograph/${id}`);
  }

  componentWillMount() {
    Store.dispatch(fetchPictographsByQuery(this.props.query, this.props.page));

    this.unsubscribe = Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        found: pictographsStore.pictographsByQuery
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      found: []
    });
    Store.dispatch(fetchPictographsByQuery(nextProps.query, nextProps.page));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const pictographElements = (this.state.found || []).map(pictograph => {
      return (
        <a
          key={pictograph.pictographId}
          onClick={event => this.handleClickImage(event, pictograph.id)}
          className="ps-grid--pic"
        >
          <img className="ps-grid--image" src={pictograph.url} />
        </a>
      );
    });

    return (
      <div className="ps-grid">
        <div className="ps-grid--content">
          {pictographElements}
        </div>
      </div>
    );
  }
}
