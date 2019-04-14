import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../actions/project";
import { Link } from "react-router-dom";
import EditProject from './projects/EditProject';

class ProjectPage extends Component {
  constructor (){
    super()
    this.state = {
      success: false,
      editIsActive: false,
      project: {}
    }
  }
  handleEditToggle = () => {
    this.setState(() => ({ 
      editIsActive: !this.state.editIsActive
    }));
  }    
  handleSaveProject = (deadline, description) => {
    const id = this.props.match.params.id;
    fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, deadline })
    }).then(() => {
      this.setState(() => ({ 
        project : { deadline, description },
        editIsActive: !this.state.editIsActive
      }));
    });
  }
  displaySuccessMesage = () => {
    return (
      <div class="alert alert-success" role="alert">
        Project successfully deleted. <Link to="/">Go home.</Link>
      </div>
    )
  }
  renderEdit = () => {
    if (this.state.editIsActive){
      return (
        <EditProject 
          handleSaveProject={this.handleSaveProject} 
          handleEditToggle={this.handleEditToggle} 
          description={this.state.project.description}
          deadline={this.state.project.deadline}
        />
      )
    }
    return (
      <div>
        <p>Deadline: {this.state.project.deadline}</p>
        <p>
          Description: {this.state.project.description}
        </p>
        <button
        onClick={this.handleEditToggle}
        className="btn btn-sm btn-outline-light mr-1 mb-2"
        >
          edit
        </button>
      </div>
    )
  }
  onDeleteButtonClick = e => {
    const id = this.props.match.params.id;
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(`/api/projects/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id })
      })
        .then(
          response =>
            response.status === 200 &&
            this.setState({ success: true })
        )
        .catch(err => console.log(err));
    }
  };
  componentDidMount() {
    var that = this;
    this.props.getProject(this.props.match.params.id, function(data){
      that.setState({ project : data })
    });
  }
  render() {
    const { project } = this.props;
    return (
      <div>
        <div className="py-5 text-white">
          <div className="mx-auto col-md-10">
            {!!this.state.success && this.displaySuccessMesage()}
            <div className="project-container row">
              <div className="col-sm-8 col-md-8 col-lg-8">
                <img
                  className="project-page-img"
                  src="https://i.imgur.com/nZ22mf9.jpg"
                />
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <h1 className="text-light">{!!project && project.projectName ? project.projectName : ""}</h1>
                <p className="mb-4 lead text-light">
                  Created by: {!!project && project.ownerName ? project.ownerName : ""}
                </p>      
                {this.renderEdit()}
                <button
                    onClick={this.onDeleteButtonClick}
                    className="btn btn-sm btn-outline-danger mb-2"
                  >
                    delete project
                  </button>
                  <button className="btn btn-teal btn-block">
                      Apply to Project
                  </button>              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { project: state.project.project };
}

export default connect(
  mapStateToProps,
  { getProject }
)(ProjectPage);
