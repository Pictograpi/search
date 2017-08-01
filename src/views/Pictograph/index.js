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
      <div key={pictograph.id} className="pc-table--row">
        <div className="pc-table--cell">
          {pictograph.term}
        </div>
        <div className="pc-table--cell">
          {pictograph.languageCode}
        </div>
        <div className="pc-table--cell">
          {pictograph.languageName}
        </div>
        <div className="pc-table--cell">
          {pictograph.typeCode}
        </div>
        <div className="pc-table--cell">
          {pictograph.typeName}
        </div>
      </div>
    );

    return (
      <div className="pc-container pc-pictograph">
        <div className="pc-container--bg-title">
          <div className="pc-container--content">
            <button
              onClick={event => this.handleBackClick(event)}
              className="pc-pictograph--title pc-button__back"
            >
              Back to results
            </button>
          </div>
        </div>
        <div className="pc-container--content pc-pictograph--main">
          <div className="pc-pictograph--row">
            <div className="pc-pictograph--column">
              <img className="pc-pictograph--pic" src={this.state.image.url} />
            </div>
            <div className="pc-pictograph--column">
              <div className="pc-pictograph--codes">
                <h2 className="pc-pictograph--codes-title">Sharing codes</h2>
                <div className="pc-pictograph--codes-group">
                  <label className="pc-pictograph--codes-label">
                    Direct link:
                  </label>
                  <input
                    readOnly
                    onClick={event => this.handleInputClick(event)}
                    className="pc-pictograph--codes-input"
                    type="text"
                    value={this.state.image.url}
                  />
                </div>
                <div className="pc-pictograph--codes-group">
                  <label className="pc-pictograph--codes-label">
                    HMTL Code:
                  </label>
                  <input
                    readOnly
                    onClick={event => this.handleInputClick(event)}
                    className="pc-pictograph--codes-input"
                    type="text"
                    value={`<img alt="perro" src="${this.state.image.url}"/>`}
                  />
                </div>
                <div className="pc-pictograph--codes-group">
                  <label className="pc-pictograph--codes-label">BBCode:</label>
                  <input
                    readOnly
                    onClick={event => this.handleInputClick(event)}
                    className="pc-pictograph--codes-input"
                    type="text"
                    value={`[img]${this.state.image.url}[/img]`}
                  />
                </div>
              </div>
              <div className="pc-pictograph--words">
                <div className="pc-table">
                  <div className="pc-table--row pc-table--row__header green">
                    <div className="pc-table--cell">Term</div>
                    <div className="pc-table--cell">Language code</div>
                    <div className="pc-table--cell">Language</div>
                    <div className="pc-table--cell">Type</div>
                    <div className="pc-table--cell">Type code</div>
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
