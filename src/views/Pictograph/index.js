import React, { Component } from "react";
import Store from "../../stores/Store";
import { Link } from "react-router-dom";
import {
  fetchPictographsByImageId,
  fetchImageById
} from "../../stores/Pictographs";
import { BrowserRouter } from "react-router-dom";
import downloadJs from "downloadjs";

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
    event.target.setSelectionRange(0, event.target.value.length);
  }

  handleBackClick(event) {
    event.preventDefault();
    this.props.history.goBack();
  }

  handleDownloadClick(event) {
    var x = new XMLHttpRequest();
    x.open("GET", this.state.image.url, true);
    x.responseType = "blob";
    x.onload = function(e) {
      downloadJs(
        e.target.response,
        `pictograpi-search-image-${Date.now()}.png`,
        "image/png"
      );
    };
    x.send();
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
      <tr key={pictograph.id}>
        <td>
          {pictograph.term}
        </td>
        <td className="is-hidden-mobile">
          {pictograph.languageCode}
        </td>
        <td>
          {pictograph.languageName}
        </td>
        <td className="is-hidden-mobile">
          {pictograph.typeCode}
        </td>
        <td>
          {pictograph.typeName}
        </td>
      </tr>
    );

    return (
      <div className="ps-pictograph section">
        <nav className="container breadcrumb is-small" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a onClick={event => this.handleBackClick(event)}>Results</a>
              {/*<Link to="/">Results</Link>*/}
            </li>
            <li className="is-active">
              <Link to={this.props.history.location}>Details</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <h1 className="title">Pictograph details</h1>
          <div className="columns">
            <div className="column is-4">
              <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                  <div className="tile is-child notification is-light box">
                    <figure className="image is-square">
                      <img src={this.state.image.url} alt="Image" />
                    </figure>
                    <div className="content has-margin-top has-text-centered">
                      <button
                        onClick={() => this.handleDownloadClick()}
                        className="button is-medium"
                      >
                        <span className="icon is-medium">
                          <i className="fa fa-download" aria-hidden="true" />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="tile notification is-warning is-child box">
                    <h1 className="title">Information</h1>
                    <div className="content">
                      <p>
                        <b>Name:</b> {this.state.image.name}
                      </p>
                      <p>
                        <b>Created:</b> {this.state.image.created}
                      </p>
                      <p>
                        <b>Type:</b> {this.state.image.type}
                      </p>
                      <p>
                        <b>External ID:</b> {this.state.image.externalId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                  <div className="tile is-child notification is-primary box">
                    <h1 className="title">Sharing codes</h1>
                    <p className="subtitle">
                      Copy and paste them in any other place
                    </p>
                    <div className="field">
                      <label className="ps-pictograph--label label">
                        HTML Code
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          readOnly
                          onClick={event => this.handleInputClick(event)}
                          value={`<img src="${this.state.image.url}"/>`}
                        />
                      </div>
                      <p className="help">
                        Use this code to include the pictograph in a website or
                        blog.
                      </p>
                    </div>
                    <div className="field">
                      <label className="ps-pictograph--label label">
                        BB Code
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          readOnly
                          onClick={event => this.handleInputClick(event)}
                          value={`[img]${this.state.image.url}[/img]`}
                        />
                      </div>
                      <p className="help">
                        Use this code to include the pictograph in a forum.
                      </p>
                    </div>
                    <div className="field">
                      <label className="ps-pictograph--label label">
                        Direct link
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          readOnly
                          onClick={event => this.handleInputClick(event)}
                          value={this.state.image.url}
                        />
                      </div>
                      <p className="help">
                        Use this code to include the pictograph in a any other
                        site.
                      </p>
                    </div>
                  </div>
                  <div className="tile is-child box">
                    <table className="table is-fullwidth is-striped">
                      <thead>
                        <tr>
                          <th>Term</th>
                          <th className="is-hidden-mobile">Language code</th>
                          <th>Language</th>
                          <th>Type</th>
                          <th className="is-hidden-mobile">Type code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pictographsRows}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Term</th>
                          <th className="is-hidden-mobile">Language code</th>
                          <th>Language</th>
                          <th>Type</th>
                          <th className="is-hidden-mobile">Type code</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
