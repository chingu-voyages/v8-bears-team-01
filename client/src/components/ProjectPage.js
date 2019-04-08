import React, { Component } from "react";

class ProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      project: []
    };
  }
  getProject(projectId){
    fetch(`/api/projects/${projectId}`)
    .then(response => response.json())
    .then(json => this.setState({ project: json }))
    .catch(err => console.log(err));
  }
  componentDidMount(){
    const projectId = this.props.match.params.id.replace(":", "");
    this.getProject(projectId);
  }
  render(){
    const { project } = this.state;
    return(
      <div>
        <div className="container">
          <h2 className="mt-4 mb-4">{project.projectName}</h2>
          <p>Project Owner: {!!project.ownerName && project.ownerName}</p>
          <p>Deadline: {!!project.deadline && project.deadline}</p>
          <p>Description: {!!project.description && project.description}</p>
        </div>
      </div>
    )

  }
}

export default ProjectPage;
