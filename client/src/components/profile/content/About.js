import React, {useState} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

import { update_user } from './../../../actions/auth'

import SelectUSState from './../../../helpers/SelectUSState';
import FileUploader from 'react-firebase-file-uploader';
import firebase from '../../../helpers/firebase.js';

const About = (props) => {
  const [isOpen, setOpen] = useState(false);

  const [avatarURL, setAvatarURL] = useState('');

  const [state, setState] = useState({ name: '', about: '', job_title: '', location: '' });

 const handleChange = (name,{target: {value}}) =>{
    setState({...state,[name]:value})
  }

  const handleClick = () =>{
    let obj = {
      ...state, picture:avatarURL
    }

    props.update_user(obj)
  }

  const updateModal = () => {
    setOpen(true);
  };

  const handleUploadSuccess = (filename) => {
    // this.setState({ avatar: filename, progress: 100, isUploading: false });
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


  // console.log(props)
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
              onChange={e=>handleChange('name',e)}
            />
            <textarea
              value={state.about}
              className="form-control profile-input-control"
              rows="5"
              placeholder="About yourself"
              onChange={e=>handleChange('about',e)}
            />
            <input
              value={state.job_title}
              className="form-control profile-input-control"
              placeholder="Job Title"
              onChange={e=>handleChange('job_title',e)}
            />
            <div className="profile-location">
              <p htmlFor="state">Location:</p>

              <SelectUSState
                className="form-control profile-input-control"
                value={state.location}
                handleChange={e=>handleChange('location',e)}
              />
            </div>
          </div>
          <div className="profile-button-container">
            <a onClick={handleClick} className="profile-button">
              Update
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
            <em>Please click on the Edit Profile button to update this information</em>
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
