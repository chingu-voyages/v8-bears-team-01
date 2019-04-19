import React, { Component } from 'react';

class PrivacyPage extends Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  render(){
    return (
      <div>
        <div className="container mb-5">
          <div className="row">
            <div className="col-md-12 text-center mt-5 mb-5">
              <h1 className="display-5">Privacy Policy</h1>
            </div>
          </div>
          <div className="text-container">
            <ul className="list-unstyled list-group">
              <h3 className="teal font-weight-bold mt-4 mb-3">Public Account Information</h3>
              <li>
                <p>Codecollab is a public community. Your username, your profile page information, and any public content you create are visible to anyone who visits Codecollab.
                </p>
              </li>
            </ul>
            <ul className="list-unstyled list-group">
              <h3 className="teal font-weight-bold mt-5 mb-3">Private Account Information</h3>
              <li>
                <p>We collect your email address at signup. We use your email address to send you communication essential to providing service, including registration confirmation and password reset email.
                </p>
              </li>
              <li>
                <p>If you sign up with a social login account (Google or Facebook) we receive your email address from these services, but we do not collect a password for your account.
                </p>
              </li>
            </ul>
            <ul className="list-unstyled list-group">
              <h3 className="teal font-weight-bold mt-5 mb-3">Security</h3>
              <li>
                <p>Codecollab has implemented processes intended to protect user information and maintain security of data. It is each user’s responsibility to protect the security of his or her login information. 
                  There are safeguards to help prevent unauthorized access, maintain data accuracy, and ensure the appropriate use of data, but no guarantee can be made that your information and data will be secure from intrusions and unauthorized release to third parties.       
                </p>
              </li>
            </ul>
          </div>
        </div>
     </div>  
    )
  }
}

export default PrivacyPage;
