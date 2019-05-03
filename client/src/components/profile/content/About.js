import React, {useState} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

import {update_user} from './../../../actions/auth';

import SelectUSState from './../../../helpers/SelectUSState';
import FileUploader from 'react-firebase-file-uploader';
import firebase from '../../../helpers/firebase.js';

const About = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const [avatarURL, setAvatarURL] = useState('');

  const {name, location, about, job_title} = props.user;

  const [state, setState] = useState({
    name,
    about,
    job_title,
    location,
  });

  const handleChange = (name, value) => {
    setState({...state, [name]: value});
  };

  const handleClick = () => {
    setLoading(true);
    let pic

    if(avatarURL===''){
       pic = props.picture
    } else {
      pic = avatarURL
    }


    let obj = {
      ...state,
      picture: pic,
    };

    props.update_user(obj).then(() => {
      setLoading(false);
      setAvatarURL('');
      setMsg('Successully uploaded');
      setTimeout(() => {
        setMsg('');
      }, 4000);
    });
  };

  const updateModal = () => {
    setOpen(true);
  };

  const handleUploadSuccess = (filename) => {
    firebase
      .storage()
      .ref('photos')
      .child(filename)
      .getDownloadURL()
      .then((url) => setAvatarURL(url));
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className="Modal"
        contentLabel="Edit Profile"
        onRequestClose={handleRequestClose}
        ariaHideApp={false}
        closeTimeoutMS={300}>
        <div className="editprofile-modal">
          <p style={{color: 'green'}}>
            <em>
              <small>{msg}</small>
            </em>
          </p>
          <button
            className="btn btn-link nav-link text-light close-button profile-close"
            onClick={handleRequestClose}>
            <i className="fas fa-times" />
          </button>
          <div className="profile-picture">
            {avatarURL ? (
              <img
                src={avatarURL}
                className="profile-pricture"
                alt="profile picture"
              />
            ) : props.user.picture ? (
              <img
                src={props.user.picture}
                className="profile-pricture"
                alt="profile picture"
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
                  storageRef={firebase.storage().ref('photos')}
                  onUploadSuccess={handleUploadSuccess}
                />
              </i>
            </label>
          </div>
          <div className="profile-button-input-container">
            <input
              value={state.name}
              className="form-control profile-input-control"
              placeholder="Name"
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <textarea
              value={state.about}
              className="form-control profile-input-control"
              rows="5"
              placeholder="About yourself"
              onChange={(e) => handleChange('about', e.target.value)}
            />
            <input
              value={state.job_title}
              className="form-control profile-input-control"
              placeholder="Job Title"
              onChange={(e) => handleChange('job_title', e.target.value)}
            />
            <div className="profile-location">
              <p htmlFor="state">Location:</p>

              <SelectUSState
                className="form-control profile-input-control"
                value={state.location}
                handleChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
          </div>
          <div className="profile-button-container">
            <a onClick={handleClick} className="profile-button">
              Update{' '}
              {isLoading && (
                <div
                  className="spinner-border spinner-border-sm "
                  role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </a>
          </div>
        </div>
      </Modal>
      <div>
        <h3>About {props.user.name}</h3>
        <p>
          {!!props.user.about ? (
            props.user.about
          ) : (
            <em>
              Please click on the Edit Profile button to update this information
            </em>
          )}
        </p>
      </div>
      <a onClick={updateModal} className="profile-button">
        Edit Profile
      </a>
    </>
  );
};

function mapStateToProps(state) {
  return {user: state.auth};
}

export default connect(
  mapStateToProps,
  {update_user},
)(About);
