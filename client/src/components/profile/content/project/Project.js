import React, {Component} from 'react';
import {Link, Switch, Route, withRouter} from 'react-router-dom';

import Allproject from './Allproject';
import Currentproject from './Currentproject';
import Completedproject from './Completedproject';
import Schedule from './Schedule';

class Project extends Component {
  state = {
    allProjects: true,
    currentProjects: false,
    completedProjects: false,
    schedule: false,
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
              Current Peojects
            </Link>

            <Link
              className={this.state.completedProjects ? 'active' : undefined}
              onClick={() => this.updateSelected('completedProjects')}
              to="/profile/uu/myprojects/completedprojects">
              Completed Peojects
            </Link>

            <Link
              className={this.state.schedule ? 'active' : undefined}
              onClick={() => this.updateSelected('schedule')}
              to="/profile/uu/myprojects/schedule">
              Schedule
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
          <Route path="/profile/uu/myprojects/schedule" component={Schedule} />
        </Switch>
      </>
    );
  }
}

export default withRouter(Project);
