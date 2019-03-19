import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";

export class Navbar extends Component {
  state = {
    registerIsActive: false,
    loginIsActive: false
  };
  handleRegisterToggle = () => {
    this.setState(() => ({ registerIsActive: !this.state.registerIsActive }));
  };
  handleLoginToggle = () => {
    this.setState(() => ({ loginIsActive: !this.state.loginIsActive }));
  };
  handleRequestClose = () => {
    this.setState(() => ({ registerIsActive: false, loginIsActive: false }));
  };
  renderContent() {
      if (this.props.auth) {
          return <div> <a href="#" className="mr-4">My Profile</a>
          <a href="/api/logout">Logout</a>
          </div>;
      } else {
          return  <div>
          <button onClick={this.handleRegisterToggle} className="btn btn-outline-primary mr-2">Log In</button>
          <button 
          onClick={this.handleRegisterToggle}
          className="btn btn-danger">Sign Up</button>
          </div>
      }
  }
  render() {
      return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">
          <Link className="text-dark" to="/">CodeCollab</Link>
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">
            {this.renderContent()}
          </nav>
        </div>
        <RegisterModal
        isOpen={this.state.registerIsActive}
        handleRequestClose={this.handleRequestClose}
        />
      </div>
      );
  }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Navbar);
