import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  browserHistory
} from "react-router-dom";
import { render } from "react-dom";
import Layout from "./components/Layout";
import Home from "./screens/Home";

render(
  <Layout>
    <Router history={browserHistory}>
      <div>
        <Route exact path="/" component={Home} />
        {/*<Route path="/admin" component={Admin} />*/}
      </div>
    </Router>
  </Layout>,
  document.getElementById("app-container")
);
