import React, { Component } from "react";
import SearchForm from "../../components/SearchForm";
import Grid from "../../components/Grid";
import Store from "../../stores/Store";
import WelcomeText from "../../components/WelcomeText";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <section className="hero is-primary is-medium">
          <div className="hero-body">
            <div className="container has-text-centered">
              <WelcomeText />
              <SearchForm history={this.props.history} />
            </div>
          </div>
        </section>
        <div className="section">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile notification is-primary is-child box">
                <h1 className="title">1. Find</h1>
                <div className="content">
                  <p>
                    Use a <b>normal word or a regular expression</b> to find
                    your pictographs. See next examples to know how it works:
                  </p>
                  <ul>
                    <li>
                      <b>dog</b>: Pictographs containing just the word perro.
                    </li>
                    <li>
                      <b>.*perro</b>: Pictographs ending with the word perro,
                      like "pasear al perro"
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile notification is-warning is-child box">
                <h1 className="title">2. Choose</h1>
                <div className="content">
                  <p>
                    <b>Navigate through results using the pagination</b> below
                    the grid of pictographs.
                  </p>
                  <p>
                    Too many results? Filter them using a more specific term or
                    RegExp.
                  </p>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile notification is-info is-child box">
                <h1 className="title">3. Share</h1>
                <div className="content">
                  <p>
                    Have you found your pictograph? Share it with anybody using
                    the sharing codes.
                  </p>
                  <p>
                    You'll need a different sharing code depending on where are
                    you including the pictograph:
                  </p>
                  <ul>
                    <li>HTML Code: Use them in websites and blogs</li>
                  </ul>
                  <ul>
                    <li>BB Code: Use them in forums.</li>
                  </ul>
                  <ul>
                    <li>Direct link: Use them in any other place.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
