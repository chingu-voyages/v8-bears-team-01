import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions/auth";

import ProjectList from "./ProjectList";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import SearchPage from "./SearchPage";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
          <BrowserRouter>
              <div className="page-wrapper">
                  <Navbar />
                  <div className="page-content">
                    <Route exact path="/" component={ProjectList} />
                    <Route path="/search" component={SearchPage} />
                  </div>
                  <Footer />
              </div>
          </BrowserRouter>
        );
    }
}

export default connect(
    null,
    { fetchUser }
)(App);
