import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import firebase from "firebase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Search from "./views/Search";
import Store from "./stores/Store";

// Initialize Firebase.
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    Store.dispatch({
      type: "USER_SET",
      payload: {
        token: user.refreshToken,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL
      }
    });
  }
});

render(
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/search/:query" component={Search} />
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("app-container")
);
