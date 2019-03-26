import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions/auth";

import Landing from "./Landing";
import Navbar from "./layout/Navbar";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(
    null,
    { fetchUser }
)(App);
