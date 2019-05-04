import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './profile.css';

const SideBar = (props) => {
  return (
    <>
      <nav className="sidebar ">
        {props.loading ? (
          <div className="text-center">
            <div
              style={{width: '3em', height: '3em'}}
              className="spinner-grow text-info  "
              role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex flex-column text-center">
              <div className="sidebar-picture">
                {props.user.picture ? (
                  <img
                    src={props.user.picture}
                    className="profile-pricture"
                    alt="profile picture"
                  />
                ) : (
                  <i className="fas fa-user-circle fa-7x" />
                )}
              </div>
              <p className="h5" style={{marginBottom: '0'}}>
                <strong>{props.user.name}</strong>
              </p>
              <p>
                {!!props.user.location ? (
                  props.user.location
                ) : (
                  <em>Please update your location</em>
                )}
              </p>
              <p>
                {!!props.user.job_title ? (
                  props.user.job_title
                ) : (
                  <em>Please update your job title</em>
                )}
              </p>
            </div>
            <div className="components">
              <Link
                className={props.about ? 'active' : undefined}
                onClick={() => props.updateState('about')}
                to="/profile/uu/about">
                About
              </Link>

              <Link
                className={props.myProject ? 'active' : undefined}
                onClick={() => props.updateState('myProject')}
                to="/profile/uu/myprojects">
                My Projects
              </Link>
            </div>{' '}
          </>
        )}
      </nav>
    </>
  );
};

function mapStateToProps(state) {
  return {user: state.auth};
}

export default connect(
  mapStateToProps,
  null,
)(SideBar);
