import React, { Component } from "react";
import { connect } from "react-redux";

export class Header extends Component {
    renderContent() {
        if (this.props.auth) {
            return <a href="/api/logout">Logout</a>;
        } else {
            return <a href="/auth/google">Login With Google</a>;
        }
    }
    render() {
        return <div>{this.renderContent()}</div>;
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Header);
