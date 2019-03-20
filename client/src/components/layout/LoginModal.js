import React from 'react';
import ReactModal from 'react-modal';

const LoginModal = (props) => (
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
          <button className="btn btn-link nav-link text-muted close-button" onClick={props.handleRequestClose}>x</button>
            <h2 className="font-weight-light modal-text">Log In</h2>
        </div>
        <div className="content">
          <a className="btn google-btn mr-2 ml-2" href="/auth/google">
            <i className="fab fa-google modal-icon"></i>
          </a>
          <a className="btn facebook-btn mr-2 ml-2" href="/auth/facebook">
            <i className="fab fa-facebook modal-icon"></i>
          </a>
          <p>or</p>
          <input className="form-control" placeholder="Email"></input><br></br>
          <input className="form-control" placeholder="Password"></input><br></br>
          <button className="btn sign-up-button mb-4">Log in</button>
        </div>
      </ReactModal>
    </div>
  </div>
)

export default LoginModal;
