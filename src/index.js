import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Search from "./views/Search";
import Pictograph from "./views/Pictograph";
import Store from "./stores/Store";

render(
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/search/:query" component={Search} />
      <Route path="/pictograph/:id" component={Pictograph} />
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("app-container")
);
