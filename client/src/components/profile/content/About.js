import React, {useState} from 'react';
import Modal from 'react-modal';

const About = () => {
  const [isOpen, setOpen] = useState(false);

  const updateModal = () => {
    setOpen(true);
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
      >
      <div className="editprofile-modal">
      <input
      className="form-control"
      placeholder="Name"
    />
          <div className="profile-button-container">
            <a onClick={updateModal} className="profile-button">
              Update
            </a>
            <a onClick={handleRequestClose} className="profile-button">
              Close
            </a>
          </div>
        </div>
      </Modal>
      <div>
        <h3>About John Doe</h3>
        <p>
          My name is John Doe and I am a Front End Developer. My previous
          expereince was working for Orange Software for 8 years and I am
          currently a freelance developer. For more information of my work,
          check out my portfolio link.
        </p>
      </div>
      <a onClick={updateModal} className="profile-button">
        Edit Profile
      </a>
    </>
  );
};

export default About;
