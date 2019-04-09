import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions/auth";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import SearchPage from "./SearchPage";
import LandingPage from "./LandingPage";
import NewProject from "./projects/NewProject";
import ProjectPage from "./ProjectPage";

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
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/search" component={SearchPage} />
                        <Route path="/newproject" component={NewProject} />
                        <Route path="/project/:id" component={ProjectPage} />
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
