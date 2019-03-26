import React from "react";
import ReactModal from "react-modal";

const LoginModal = props => (
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
                    className="btn btn-link nav-link text-muted close-button"
                    onClick={props.handleRequestClose}
                >
                    x
                </button>
                <h2 className="font-weight-light modal-text">Log In</h2>
            </div>
            <div className="content">
                <a className="btn google-btn mr-2 ml-2" href="/auth/google">
                    <i className="fab fa-google modal-icon" />
                </a>
                <a className="btn facebook-btn mr-2 ml-2" href="/auth/facebook">
                    <i className="fab fa-facebook modal-icon" />
                </a>
                <p>or</p>
                <input
                    value={props.email}
                    type="email"
                    className="form-control"
                    onChange={e => props.updateEmail(e.target.value)}
                    placeholder="Email"
                />
                <br />
                <input
                    value={props.password}
                    type="password"
                    className="form-control"
                    onChange={e => props.updatePassword(e.target.value)}
                    placeholder="Password"
                />

                <p style={{ color: "red" }}>
                    <em>
                        <small>{props.errorMsg}</small>
                    </em>
                </p>
                <br />
                <button
                    onClick={props.handleLogin}
                    className="btn sign-up-button mb-4"
                >
                    Log in
                </button>
            </div>
        </ReactModal>
    </div>
);

export default LoginModal;
