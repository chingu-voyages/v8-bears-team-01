import React from 'react';
import ReactModal from 'react-modal';

const ContactModal = props => (
  <div>
    <div className="container">
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={props.isOpen}
        onRequestClose={props.handleRequestClose}
        contentLabel="Contact"
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
          <h2 className="font-weight-light">Apply to Project</h2>
        </div>
        <div className="content">
          <input
            value={props.name}
            className="form-control"
            placeholder="Desired Role"
          />
          <br />
          <textarea
            className="form-control"
            placeholder="Your Message">
          </textarea>
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
