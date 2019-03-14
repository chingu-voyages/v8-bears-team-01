import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions/auth";

import Landing from "./Landing";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route exact path="/" component={Landing} />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(
    null,
    { fetchUser }
)(App);
