import React, { Component } from "react";

class ProjectPage extends Component {

  getProject(projectId){
    //TODO: fetch request to /projects/:projectId
    console.log(projectId)
  }
  componentDidMount(){
    const projectId = this.props.match.params.id;
    this.getProject(projectId);
  }
  render(){
    return(
      <div>
        <p>This is the project page.</p>
      </div>
    )

  }
}

export default ProjectPage;
