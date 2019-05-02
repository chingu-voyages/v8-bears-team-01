import React, { useState } from "react";
import Modal from "react-modal";
import SelectUSState from "./../../../helpers/SelectUSState";
import FileUploader from "react-firebase-file-uploader";
import firebase from "./../../../helpers/firebase";

const About = () => {
    const [isOpen, setOpen] = useState(false);

    const [value, updateValue] = useState("");
    const [avatarURL, setAvatarURL] = useState("");

    const updateModal = () => {
        setOpen(true);
    };

    const handleUploadSuccess = filename => {
        // this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("photos")
            .child(filename)
            .getDownloadURL()
            .then(url => setAvatarURL(url));
    };

    const handleRequestClose = () => {
        setOpen(false);
    };

    const setNewValue = ({ target: { value } }) => {
        updateValue(value);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                className="Modal"
                contentLabel="Edit Profile"
                onRequestClose={handleRequestClose}
                ariaHideApp={false}
                closeTimeoutMS={300}
            >
                <div className="editprofile-modal">
                    <button
                        className="btn btn-link nav-link text-light close-button profile-close"
                        onClick={handleRequestClose}
                    >
                        <i className="fas fa-times" />
                    </button>
                    <div className="profile-picture">
                        {!!avatarURL ? (
                            <img
                                src={avatarURL}
                                className="profile-pricture"
                                alt=""
                            />
                        ) : (
                            <i className="fas fa-user-circle fa-7x" />
                        )}

                        <label className="profile-upload-button">
                            <i className="fas fa-pencil-alt fa-2x">
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    name="avatar"
                                    randomizeFilename
                                    storageRef={firebase
                                        .storage()
                                        .ref("photos")}
                                    onUploadSuccess={handleUploadSuccess}
                                />
                            </i>
                        </label>
                    </div>
                    <div className="profile-button-input-container">
                        <input
                            className="form-control profile-input-control"
                            placeholder="Name"
                        />
                        <textarea
                            className="form-control profile-input-control"
                            rows="5"
                            placeholder="About yourself"
                        />
                        <input
                            className="form-control profile-input-control"
                            placeholder="Job Title"
                        />
                        <div className="profile-location">
                            <p htmlFor="state">Location:</p>

                            <SelectUSState
                                className="form-control profile-input-control"
                                value={value}
                                handleChange={setNewValue}
                            />
                        </div>
                    </div>
                    <div className="profile-button-container">
                        <button
                            onClick={updateModal}
                            className="profile-button"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </Modal>
            <div>
                <h3>About John Doe</h3>
                <p>
                    My name is John Doe and I am a Front End Developer. My
                    previous expereince was working for Orange Software for 8
                    years and I am currently a freelance developer. For more
                    information of my work, check out my portfolio link.
                </p>
            </div>
            <button onClick={updateModal} className="profile-button">
                Edit Profile
            </button>
        </>
    );
};

export default About;
