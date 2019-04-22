import React, {Component} from 'react';
import {Link, Switch, Route, withRouter} from 'react-router-dom';
import Allcollaborators from './Allcollaborators';
import Currentcollaborators from './Currentcollaborators';
import Pastcollaborators from './Pastcollaborators';

class Collaborators extends Component {
  state = {
    allCollaborators: true,
    currentCollaborators: false,
    pastCollaborators: false,
    currentInput: 'allCollaborators',
  };

  componentDidMount() {
    this.props.history.push('/profile/uu/collaborators/allCollaborators');
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
              className={this.state.allCollaborators ? 'active' : undefined}
              onClick={() => this.updateSelected('allCollaborators')}
              to="/profile/uu/collaborators/allcollaborators">
              All Collaborators
            </Link>

            <Link
              className={this.state.currentCollaborators ? 'active' : undefined}
              onClick={() => this.updateSelected('currentCollaborators')}
              to="/profile/uu/collaborators/currentcollaborators">
              Current Collaborators
            </Link>

            <Link
              className={this.state.pastCollaborators ? 'active' : undefined}
              onClick={() => this.updateSelected('pastCollaborators')}
              to="/profile/uu/collaborators/pastcollaborators">
              Past Collaborators
            </Link>
          </div>
        </div>

        <Switch>
          <Route
            path="/profile/uu/collaborators/allcollaborators"
            component={Allcollaborators}
          />
          <Route
            path="/profile/uu/collaborators/currentcollaborators"
            component={Currentcollaborators}
          />
          <Route
            path="/profile/uu/collaborators/pastcollaborators"
            component={Pastcollaborators}
          />
        </Switch>
      </>
    );
  }
}

export default Collaborators;
