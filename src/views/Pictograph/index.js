import React, { Component } from "react";
import Store from "../../stores/Store";
import { Link } from "react-router-dom";
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
      <tr key={pictograph.id}>
        <td>
          {pictograph.term}
        </td>
        <td>
          {pictograph.languageCode}
        </td>
        <td>
          {pictograph.languageName}
        </td>
        <td>
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
            <div className="column is-one-third">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-square">
                    <img src={this.state.image.url} alt="Image" />
                  </figure>
                </div>
                {/* TODO: Add image info and tags.
                  <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">123123123.png</p>
                    </div>
                  </div>

                  <div className="content tags">
                    <span className="tag is-success">Verb</span>
                    <span className="tag is-warning">Adjective</span>
                  </div>
                </div>*/}
              </div>
            </div>
            <div className="column">
              <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification is-primary">
                    <p className="title">Sharing codes</p>
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
                          value={`<img alt="perro" src="${this.state.image
                            .url}"/>`}
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
                  </article>
                </div>
              </div>
              <table className="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Language code</th>
                    <th>Language</th>
                    <th>Type</th>
                    <th>Type code</th>
                  </tr>
                </thead>
                <tbody>
                  {pictographsRows}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Term</th>
                    <th>Language code</th>
                    <th>Language</th>
                    <th>Type</th>
                    <th>Type code</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
