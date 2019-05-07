import React, { Component } from "react";
import { withRouter } from "react-router";

import { connect } from "react-redux";

import { get_auth_token } from "../actions/auth";

class Auth extends Component {
    componentDidMount() {
        this.props.get_auth_token().then(() => {
            let result = localStorage.getItem("authToken");
            if (result) {
                this.props.history.push("/dashboard");
            } else {
                localStorage.setItem("authToken", this.props.token);
                this.props.history.push("/dashboard");
            }
        });
    }

    render() {
        return (
            <>
                <p>redirecting...</p>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.token
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        { get_auth_token }
    )(Auth)
);
