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
        <div className="py-5 text-white">
          <div className="mx-auto col-md-10">
            <div className="project-container row">
              <div className="col-sm-8 col-md-8 col-lg-8">
                <img className="project-page-img" src="https://i.imgur.com/nZ22mf9.jpg"></img>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <h1 className="text-light">{project.projectName}</h1>
                <p className="mb-4 lead text-light">Created by: {!!project.ownerName && project.ownerName}</p> 
                <p>Deadline: {!!project.deadline && project.deadline}</p>
                <p>Description: {!!project.description && project.description}</p>
                <button className="btn btn-teal">Apply to Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default ProjectPage;
