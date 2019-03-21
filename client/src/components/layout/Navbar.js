import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import axios from "axios";

export class Navbar extends Component {
  state = {
    registerIsActive: false,
    loginIsActive: false,
    email: "",
    password: "",
    name: "",
    errorMsg: ""
  };
  handleRegisterToggle = () => {
    this.clearFields();
    this.setState(() => ({ registerIsActive: !this.state.registerIsActive }));
  };
  handleLoginToggle = () => {
    this.clearFields();
    this.setState(() => ({ loginIsActive: !this.state.loginIsActive }));
  };
  handleRequestClose = () => {
    this.setState(() => ({ registerIsActive: false, loginIsActive: false }));
  };

  updateEmail = val => {
    this.setState({ email: val });
  };

  updatePassword = val => {
    this.setState({ password: val });
  };

  updateName = val => {
    this.setState({ name: val });
  };

  handleValidation = type => {
    const { email, password, name } = this.state;
    if (type === "signup") {
      if (!email || !password || !name) {
        this.setState({ errorMsg: "All fields are required" });
        return;
      }
      if (password.length < 6 || password.length > 30) {
        this.setState({
          errorMsg: "Password must be between 6 and 30 characters"
        });
        return;
      }
      if (password.includes(" ")) {
        this.setState({ errorMsg: "Password cannot contain spaces" });
      }
    }

    if (type === "login") {
      if (!email || !password) {
        this.setState({ errorMsg: "All fields are required" });
        return;
      }
    }

    if (!email.includes("@")) {
      this.setState({ errorMsg: "Invalid email address." });
      return;
    }

    if (
      email.includes("'") ||
      email.includes('"') ||
      password.includes("'") ||
      password.includes('"')
    ) {
      this.setState({ errorMsg: "Fields cannot contain ' or \"" });
      return;
    }
  };

  handleLogin = () => {
    //  this.handleValidation('login');
    let email = this.state.email;
    let password = this.state.password;

    let obj = {
      email: email.trim(),
      password: password.trim()
    };

    axios.post(`/auth/login`, obj).then(resp => {
      console.log("return login");
    });
  };

  handleSignup = () => {
    // this.handleValidation('signup');
    let email = this.state.email;
    let password = this.state.password;
    let name = this.state.name;
    let obj = {
      email: email.trim(),
      password: password.trim(),
      name: name.trim()
    };

    axios.post(`/auth/signup`, obj).then(resp => {
      console.log("return signup");
    });
  };

  clearFields = () => {
    this.setState({
      email: "",
      password: "",
      name: "",
      errorMsg: ""
    });
  };

  renderContent() {
    if (this.props.auth) {
      return (
        <div>
          {" "}
          <a href="#" className="mr-4">
            My Profile
          </a>
          <a href="/api/logout">Logout</a>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.handleLoginToggle}
            className="btn btn-outline-primary mr-2"
          >
            Log In
          </button>
          <button
            onClick={this.handleRegisterToggle}
            className="btn btn-danger"
          >
            Sign Up
          </button>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            <Link className="text-dark" to="/">
              CodeCollab
            </Link>
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">{this.renderContent()}</nav>
        </div>
        <RegisterModal
          isOpen={this.state.registerIsActive}
          handleRequestClose={this.handleRequestClose}
          updateEmail={this.updateEmail}
          updatePassword={this.updatePassword}
          handleSignup={this.handleSignup}
          updateName={this.updateName}
          errorMsg={this.state.errorMsg}
        />
        <LoginModal
          isOpen={this.state.loginIsActive}
          handleRequestClose={this.handleRequestClose}
          updateEmail={this.updateEmail}
          updatePassword={this.updatePassword}
          handleLogin={this.handleLogin}
          errorMsg={this.state.errorMsg}
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
