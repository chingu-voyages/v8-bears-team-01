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
import UserProjectPage from "./UserProjectPage"

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
                        <Route exact path="/search" component={SearchPage} />
                        <Route exact path="/newproject" component={NewProject} />
                        <Route exact path="/project/:id" component={ProjectPage} />
                        <Route exact path="/project/user/projects" component={UserProjectPage}/>
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
