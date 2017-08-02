import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  fetchPictographsByImageId,
  fetchImageById
} from "../../stores/Pictographs";
import { BrowserRouter } from "react-router-dom";

export default class Pictograph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      pictographs: []
    };
  }

  handleInputClick(event) {
    event.target.select();
  }

  handleBackClick(event) {
    event.preventDefault();
    this.props.history.goBack();
  }

  componentWillMount() {
    const id = this.props.history.location.pathname.substr(
      this.props.history.location.pathname.lastIndexOf("/") + 1
    );

    Store.dispatch(fetchPictographsByImageId(id));
    Store.dispatch(fetchImageById(id));

    this.unsubscribe = Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        pictographs: pictographsStore.pictographsById || [],
        image: pictographsStore.imageById || {}
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const pictographsRows = this.state.pictographs.map(pictograph =>
      <div key={pictograph.id} className="ps-table--row">
        <div className="ps-table--cell">
          {pictograph.term}
        </div>
        <div className="ps-table--cell">
          {pictograph.languageCode}
        </div>
        <div className="ps-table--cell">
          {pictograph.languageName}
        </div>
        <div className="ps-table--cell">
          {pictograph.typeCode}
        </div>
        <div className="ps-table--cell">
          {pictograph.typeName}
        </div>
      </div>
    );

    return (
      <div className="ps-container ps-pictograph">
        <div className="ps-container--bg-title">
          <div className="ps-container--content">
            <button
              onClick={event => this.handleBackClick(event)}
              className="ps-pictograph--title ps-button__back"
            >
              Back to results
            </button>
          </div>
        </div>
        <div className="ps-container--content ps-pictograph--main">
          <div className="ps-pictograph--row">
            <div className="ps-pictograph--column">
              <img className="ps-pictograph--pic" src={this.state.image.url} />
            </div>
            <div className="ps-pictograph--column">
              <div className="ps-pictograph--codes">
                <h2 className="ps-pictograph--codes-title">Sharing codes</h2>
                <div className="ps-pictograph--codes-group">
                  <label className="ps-pictograph--codes-label">
                    Direct link:
                  </label>
                  <input
                    readOnly
                    onClick={event => this.handleInputClick(event)}
                    className="ps-pictograph--codes-input"
                    type="text"
                    value={this.state.image.url}
                  />
                </div>
                <div className="ps-pictograph--codes-group">
                  <label className="ps-pictograph--codes-label">
                    HMTL Code:
                  </label>
                  <input
                    readOnly
                    onClick={event => this.handleInputClick(event)}
                    className="ps-pictograph--codes-input"
                    type="text"
                    value={`<img alt="perro" src="${this.state.image.url}"/>`}
                  />
                </div>
                <div className="ps-pictograph--codes-group">
                  <label className="ps-pictograph--codes-label">BBCode:</label>
                  <input
                    readOnly
                    onClick={event => this.handleInputClick(event)}
                    className="ps-pictograph--codes-input"
                    type="text"
                    value={`[img]${this.state.image.url}[/img]`}
                  />
                </div>
              </div>
              <div className="ps-pictograph--words">
                <div className="ps-table">
                  <div className="ps-table--row ps-table--row__header green">
                    <div className="ps-table--cell">Term</div>
                    <div className="ps-table--cell">Language code</div>
                    <div className="ps-table--cell">Language</div>
                    <div className="ps-table--cell">Type</div>
                    <div className="ps-table--cell">Type code</div>
                  </div>
                  {pictographsRows}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
