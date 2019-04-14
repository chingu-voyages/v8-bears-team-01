import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";

import { fetchUser } from "../../actions/auth";

import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

import { handleValidation } from "../../helpers/handleValidation";

export class Navbar extends Component {
  state = {
    registerIsActive: false,
    loginIsActive: false,
    email: "",
    password: "",
    comfirmPassword: "",
    name: "",
    errorMsg: "",
    isLoading: false
  };
  handleRegisterToggle = () => {
    this.clearFields();
    this.setState(() => ({
      registerIsActive: !this.state.registerIsActive
    }));
  };
  handleLoginToggle = () => {
    this.clearFields();
    this.setState(() => ({ loginIsActive: !this.state.loginIsActive }));
  };
  handleRequestClose = () => {
    this.clearFields();
    this.setState(() => ({
      registerIsActive: false,
      loginIsActive: false
    }));
  };

  updateEmail = val => {
    this.setState({ email: val });
  };

  updatePassword = val => {
    this.setState({ password: val });
  };

  updateConfirmPassword = val => {
    this.setState({ comfirmPassword: val });
  };

  updateName = val => {
    this.setState({ name: val });
  };

  handleLogin = () => {
    const { name, email, password, comfirmPassword } = this.state;
    const { errorMsg, response } = handleValidation(
      name,
      email,
      password,
      comfirmPassword,
      "login"
    );
    if (response === false) {
      this.setState({ errorMsg });
      return;
    }
    this.setState({ isLoading: true });

    let obj = {
      email: email.trim(),
      password: password.trim()
    };

    axios
      .post(`/auth/login`, obj)
      .then(resp => {
        //   console.log(resp.data);
        this.setState({ isLoading: false });
        this.clearFields();
        this.setState({ errMessage: "", loginIsActive: false });
        localStorage.setItem("authToken", resp.data.token);
        this.props.fetchUser().then(resp => {
          this.props.history.push("/dashboard");
        });
        // window.location.assign("/");
      })
      .catch(err => {
        err.response &&
          this.setState({ errorMsg: err.response.data.errMessage });
      });
  };

  handleSignup = () => {
    const { name, email, password, comfirmPassword } = this.state;
    const { errorMsg, response } = handleValidation(
      name,
      email,
      password,
      comfirmPassword,
      "signup"
    );
    if (response === false) {
      this.setState({ errorMsg });
      return;
    }
    this.setState({ isLoading: true });

    let obj = {
      email: email.trim(),
      password: password.trim(),
      name: name.trim()
    };

    axios
      .post(`/auth/signup`, obj)
      .then(resp => {
        this.setState({ isLoading: false });
        //console.log(resp.data);
        this.clearFields();
        this.setState({ errMessage: "", registerIsActive: false });

        this.props.history.push("/dashboard");

        
      })
      .catch(err => {
        err.response &&
          this.setState({ errorMsg: err.response.data.errMessage });
      });
  };

  handleLogout = () => {
    //send token object while logging out
    axios
      .get("/api/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
      .then(resp => {
        localStorage.removeItem("authToken");
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleProfile = () => {
    //do something
  };

  handleDashboard = () =>{
    this.props.history.push("/dashboard")
  }

  clearFields = () => {
    this.setState({
      email: "",
      password: "",
      name: "",
      errorMsg: "",
      comfirmPassword: "",
      isLoading: false
    });
  };

  renderContent() {
    if (localStorage.getItem("authToken")) {
      return (
        <div>
          {" "}

          <a
          onClick={this.handleDashboard}
          className="mr-4 text-light"
          style={{ cursor: "pointer" }}
        >
         Dashboard
        </a>

          <a
            onClick={this.handleProfile}
            className="mr-4 text-light"
            style={{ cursor: "pointer" }}
          >
            My Profile
          </a>
          
          <a
            onClick={this.handleLogout}
            className="text-light"
            style={{ cursor: "pointer" }}
          >
            Logout
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.handleLoginToggle}
            className="btn btn-outline-light mr-2"
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
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-black">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            <Link
              className="text-light"
              to="/"
              style={{ textDecoration: "none" }}
            >
              CodeCollab
            </Link>
          </h5>
          <div className="search-container d-xs-none d-sm-none d-md-block">
            <form action="/search" method="get">
              <input
                className="search expandright d-xs-none d-sm-none d-md-block"
                id="searchright"
                type="search"
                name="q"
                placeholder="Search"
              />
              <label className="button searchbutton" htmlFor="searchright">
                <span className="mglass">&#9906;</span>
              </label>
            </form>
          </div>
          <nav className="my-2 my-md-0 mr-md-3">{this.renderContent()}</nav>
        </div>
        <RegisterModal
          email={this.state.email}
          name={this.state.name}
          password={this.state.password}
          confirmPassword={this.state.comfirmPassword}
          isOpen={this.state.registerIsActive}
          handleRequestClose={this.handleRequestClose}
          updateEmail={this.updateEmail}
          updatePassword={this.updatePassword}
          handleSignup={this.handleSignup}
          updateName={this.updateName}
          errorMsg={this.state.errorMsg}
          updateConfirmPassword={this.updateConfirmPassword}
          isLoading={this.state.isLoading}
        />
        <LoginModal
          email={this.state.email}
          name={this.state.name}
          password={this.state.password}
          isOpen={this.state.loginIsActive}
          handleRequestClose={this.handleRequestClose}
          updateEmail={this.updateEmail}
          updatePassword={this.updatePassword}
          handleLogin={this.handleLogin}
          errorMsg={this.state.errorMsg}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { fetchUser }
  )(Navbar)
);
