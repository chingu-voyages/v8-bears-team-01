import React from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

const RegisterModal = (props) => (
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
       <button className="btn btn-link nav-link text-muted close-button" onClick={props.handleRequestClose}>x</button>
        <div className="content">
          <h2 className="display-5 text-center font-weight-light mb-4">Sign Up</h2>
          <a className="btn google-btn btn-block" href="/auth/google">
            <i className="fab fa-google modal-icon"></i>  Sign up With Google
          </a>
          <a className="btn facebook-btn btn-block" href="/auth/facebook">
            <i className="fab fa-facebook modal-icon"></i>  Sign up With Facebook
          </a>
          <p className="policy-modal-link text-secondary"><span>Read our </span>
            <button className="btn btn-link policy-modal-link" onClick={props.handleRequestClose}><Link to="/privacy">Privacy Policy.</Link></button>
          </p>
        </div>
      </ReactModal>
    </div>
  </div>
)

export default RegisterModal;
