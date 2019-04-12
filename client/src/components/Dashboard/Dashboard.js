import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";

import { fetchUser } from "../../actions/auth";
import { get_user_projects } from "../../actions/project"
// import { get_auth_token } from "../../actions/auth"

import RecentMessages from './RecentMessages'
import YourProjects from './YourProjects'
import JoinedProjects from './JoinedProjects'

 class Dashboard extends Component {
   componentDidMount(){
    
    //get the current user
     this.props.fetchUser()
          .then(
      //get user projects
      //you can uncomment code below when the backend is hooked up
             // this.props.get_user_projects(this.props.user._id)
               )
    
   }
  render() {
    return (
      <div className="projects-list-container container">
        <h3 className="content-header text-center display-4">Dashboard</h3>
        <RecentMessages/>
        <YourProjects />
        <JoinedProjects/>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      user: state.auth.user,

  };
}

export default connect(mapStateToProps,{fetchUser,get_user_projects})(Dashboard)
