import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions/auth";

import ProjectList from "./ProjectList";
import Navbar from "./layout/Navbar";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
<<<<<<< HEAD
                    <div>
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                    </div>
=======
                  <div>
                    <Navbar />
                    <Route exact path="/" component={ProjectList} />
                  </div>
>>>>>>> pr-6
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(
    null,
    { fetchUser }
)(App);
