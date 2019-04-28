import React from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

const ContactModal = props => (
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
          <h2 className="font-weight-light">Contact</h2>
        </div>
        <div className="content">
          <p className="divider line mt-4 mb-4 text-dark">or</p>
          <input
            value={props.name}
            className="form-control"
            onChange={e => props.updateName(e.target.value)}
            placeholder="Desired Role"
          />
          <br />
          <textarea
            className="form-control"
            onChange={e => props.updateEmail(e.target.value)}
            placeholder="Your Message">
          </textarea>
          <br />
          <div className="input-group">
            <input
              value={props.password}
              type="password"
              className="form-control mr-1"
              onChange={e => props.updatePassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <p style={{ color: "red" }}>
            <em>
              <small>{props.errorMsg}</small>
            </em>
          </p>
          <br />
          <button className="btn btn-teal mb-4">
            Apply{" "}
          </button>2
        </div>
      </ReactModal>
    </div>
  </div>
);

export default ContactModal;
