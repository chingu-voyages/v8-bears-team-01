import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Header extends Component {
    renderContent() {
        if (this.props.auth) {
            return <a href="/api/logout">Logout</a>;
        } else {
            return <a href="/auth/google">Login With Google</a>;
        }
    }
    render() {
        return (
        <div>
          <nav className="navbar navbar-light navbar-expand-sm mb-4 bg-light">
            <Link className="navbar-brand text-dark" to="/">
              DevJoin
            </Link>
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  {this.renderContent()}
                </li>
              </ul>
            </div>
          </nav>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Header);
