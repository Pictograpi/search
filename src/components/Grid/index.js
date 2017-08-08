import React, { Component } from "react";
import Store from "../../stores/Store";
import { fetchPictographsByQuery } from "../../stores/Pictographs";
import TotalResultsText from "../../components/TotalResultsText";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      query: props.query
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
      found: [],
      query: nextProps.query
    });
    Store.dispatch(fetchPictographsByQuery(nextProps.query, nextProps.page));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const pictographElements = (this.state.found || []).map(pictograph => {
      return (
        <div className="column is-2" key={pictograph.pictographId}>
          <a
            onClick={event => this.handleClickImage(event, pictograph.id)}
            className="ps-grid--pic"
          >
            <img className="ps-grid--image" src={pictograph.url} />
          </a>
        </div>
      );
    });

    return (
      <div>
        <TotalResultsText query={this.state.query} />
        <div className="section">
          <div className="container">
            <div className="columns is-multiline ps-grid">
              {pictographElements}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
