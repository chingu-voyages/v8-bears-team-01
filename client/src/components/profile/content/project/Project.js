import React, {Component} from 'react';
import {Link, Switch, Route, withRouter} from 'react-router-dom';

import Allproject from './Allproject';
import Currentproject from './Currentproject';
import Completedproject from './Completedproject';

class Project extends Component {
  state = {
    allProjects: true,
    currentProjects: false,
    completedProjects: false,
    currentInput: 'allProjects',
  };

  componentDidMount() {
    this.props.history.push('/profile/uu/myprojects/allprojects');
  }

  updateSelected = (name) => {
    let currentInput = this.state.currentInput;
    this.setState((prevState) => ({[currentInput]: !prevState[currentInput]}));

    this.setState((prevState) => ({
      [name]: !prevState[name],
      currentInput: name,
    }));
  };

  render() {
    return (
      <>
        <div className="project-page-container">
          <div className="project-page">
            <Link
              className={this.state.allProjects ? 'active' : undefined}
              onClick={() => this.updateSelected('allProjects')}
              to="/profile/uu/myprojects/allprojects">
              All Projects
            </Link>

            <Link
              className={this.state.currentProjects ? 'active' : undefined}
              onClick={() => this.updateSelected('currentProjects')}
              to="/profile/uu/myprojects/currentprojects">
              Current Projects
            </Link>

            <Link
              className={this.state.completedProjects ? 'active' : undefined}
              onClick={() => this.updateSelected('completedProjects')}
              to="/profile/uu/myprojects/completedprojects">
              Completed Projects
            </Link>
          </div>
        </div>

        <Switch>
          <Route
            path="/profile/uu/myprojects/allprojects"
            component={Allproject}
          />
          <Route
            path="/profile/uu/myprojects/currentprojects"
            component={Currentproject}
          />
          <Route
            path="/profile/uu/myprojects/completedprojects"
            component={Completedproject}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(Project);
