import React, { Component } from "react";
import Store from "../../stores/Store";
import { pictographsByImageId, imageById } from "../../stores/Pictographs";

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

  componentWillMount() {
    const id = this.props.history.location.pathname.substr(
      this.props.history.location.pathname.lastIndexOf("/") + 1
    );

    Store.dispatch(pictographsByImageId(id));
    Store.dispatch(imageById(id));

    Store.subscribe(() => {
      const pictographsStore = Store.getState().pictographs;

      this.setState({
        pictographs: pictographsStore.pictographsById || [],
        image: pictographsStore.imageById || {}
      });
    });
  }

  render() {
    const pictographsRows = this.state.pictographs.map(pictograph =>
      <div className="pc-table--row">
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
            <h1 className="pc-pictograph--title">
              Showing image {this.state.image.name}
            </h1>
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
                    onClick={event => this.handleInputClick(event)}
                    className="pc-pictograph--codes-input"
                    type="text"
                    value={`<img alt="perro" src="${this.state.image.url}"/>`}
                  />
                </div>
                <div className="pc-pictograph--codes-group">
                  <label className="pc-pictograph--codes-label">BBCode:</label>
                  <input
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
