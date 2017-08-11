import React, { Component } from "react";
import Store from "../../stores/Store";
import {
  fetchAllLanguages,
  storeSelectedLanguageId
} from "../../stores/Languages";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query
    };
  }

  /**
   * Searches pictographs by the query introduced.
   *
   * @param {any} event
   * @memberof Search
   */
  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.query) {
      return;
    }

    this.setState({
      isDropdownVisible: false
    });
    this.props.history.push(
      `/search/${this.state.query.trim()}?languageId=${this.state.selectedId ||
        this.state.languages[0].id}`
    );
  }

  /**
   * Toggles dropdown when it is clicked.
   *
   * @param {any} event
   * @memberof Search
   */
  handleDropdownClick(event) {
    event.preventDefault();
    this.setState({
      isDropdownVisible: !this.state.isDropdownVisible
    });
  }

  handleDropdownItemClick(event, languageId) {
    event.preventDefault();

    Store.dispatch(storeSelectedLanguageId(languageId));

    this.setState({
      isDropdownVisible: false
    });
  }

  /**
   * Updates state when input is changed.
   *
   * @param {any} event
   * @memberof Search
   */
  handleQueryEntry(event) {
    this.setState({
      query: event.target.value
    });
  }

  componentWillMount() {
    Store.dispatch(fetchAllLanguages());

    Store.subscribe(() => {
      this.setState({
        languages: Store.getState().languages.all,
        selectedId: Store.getState().languages.selectedId
      });
    });
  }

  render() {
    const dropdownClasses = `dropdown ${this.state.isDropdownVisible &&
      "is-active"}`;
    const selectedLanguage =
      (this.state.languages || [])
        .filter(lang => lang.id === this.state.selectedId)[0] ||
      (this.state.languages || [])[0];
    const languageElements = (this.state.languages || []).map(language =>
      <a
        className="dropdown-item is-dropdown-dark is-dropdown-with-flag"
        key={language.id}
        onClick={event => this.handleDropdownItemClick(event, language.id)}
      >
        <i
          className={`icon is-small has-flag has-flag-${language.code.toLowerCase()}`}
        />
        {language.name}
      </a>
    );

    return (
      <form
        className="ps-search-form"
        onSubmit={event => this.handleSubmit(event)}
      >
        <div className="field has-addons has-addons-centered">
          <div className="control">
            <div className={dropdownClasses}>
              <div className="dropdown-trigger">
                <a
                  onClick={event => this.handleDropdownClick(event)}
                  className="button is-large"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <i
                    className={`icon is-small has-flag has-flag-${selectedLanguage &&
                      selectedLanguage.code.toLowerCase()}`}
                  />
                  <span className="icon is-medium">
                    <i className="fa fa-angle-down" aria-hidden="true" />
                  </span>
                </a>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  {languageElements}
                </div>
              </div>
            </div>
          </div>
          <div className="control">
            <input
              className="input is-large"
              type="text"
              placeholder="Find in Pictograpi"
              value={this.state.query}
              onChange={event => this.handleQueryEntry(event)}
              onSubmit={event => this.handleQueryEntry(event)}
            />
          </div>
          <div className="control">
            <a
              className="button is-warning is-large"
              onClick={event => this.handleSubmit(event)}
            >
              Search
            </a>
          </div>
        </div>
      </form>
    );
  }
}
