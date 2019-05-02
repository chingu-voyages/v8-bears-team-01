import React from 'react';
import ReactModal from 'react-modal';
import {Link} from 'react-router-dom';

const RegisterModal = props => (
  <div>
    <div className="container">
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={props.isOpen}
        onRequestClose={props.handleRequestClose}
        contentLabel="Register"
        ariaHideApp={false}
        closeTimeoutMS={300}
      >
        <div className="modal-header-section">
          <button
            className="btn btn-link nav-link text-light close-button"
            onClick={props.handleRequestClose}
          >
            <i className="fas fa-times" />
          </button>
          <h2 className="font-weight-light">Sign Up</h2>
        </div>
        <div className="content">
          <a className="btn google-btn mr-2 ml-2" href="/auth/google">
            <i className="fab fa-google modal-icon" />
          </a>
          <a className="btn facebook-btn mr-2 ml-2" href="/auth/facebook">
            <i className="fab fa-facebook modal-icon" />
          </a>
          <p className="divider line mt-4 mb-4 text-dark">or</p>
          <input
            value={props.name}
            className="form-control"
            onChange={e => props.updateField ('name', e.target.value)}
            placeholder="Name"
          />
          <br />
          <input
            value={props.email}
            className="form-control"
            onChange={e => props.updateField ('email', e.target.value)}
            placeholder="Email"
          />
          <br />
          <div className="input-group">
            <input
              value={props.password}
              type="password"
              className="form-control mr-1"
              onChange={e => props.updateField ('password', e.target.value)}
              placeholder="Password"
            />
            <br />
            <input
              value={props.comfirmPassowrd}
              type="password"
              className="form-control ml-1"
              onChange={e =>
                props.updateField ('comfirmPassword', e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          <p style={{color: 'red'}}>
            <em>
              <small>{props.errorMsg}</small>
            </em>
          </p>
          <br />
          <button onClick={props.handleSignup} className="btn btn-teal mb-4">
            Sign Up{' '}
            {props.isLoading &&
              <div className="spinner-border spinner-border-sm " role="status">
                <span className="sr-only">Loading...</span>
              </div>}
          </button>
          <p className="policy-modal-link text-secondary">
            <span>Read our </span>
            <button
              className="btn btn-link policy-modal-link"
              onClick={props.handleRequestClose}
            >
              <Link to="/privacy">Privacy Policy.</Link>
            </button>
          </p>
        </div>
      </ReactModal>
    </div>
  </div>
);

export default RegisterModal;
