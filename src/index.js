import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import firebase from "firebase";
import Layout from "./components/Layout";
import Home from "./screens/Home";

// Initialize Firebase.
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID
});

render(
  <Layout>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        {/*<Route path="/admin" component={Admin} />*/}
      </div>
    </Router>
  </Layout>,
  document.getElementById("app-container")
);
