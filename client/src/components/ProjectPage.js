import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject, delete_project } from "../actions/project";
import ContactModal from "./layout/ContactModal";


class ProjectPage extends Component {
    constructor() {
        super();
        this.state = {
            success: false,
            project: {},
            messageBody: '',
            contactModalIsActive: false,
            status: '',
            role: 'developer'
        };
    }

    handleUpdateMessageBody = (e) => {
      if(e && e.target && e.target.value){
        const messageBody = e.target.value
        this.setState (() => ({messageBody: messageBody}));
        console.log(this.props.project)
      }
    }

    handleUpdateRoles = (e) => {
      const projectRoles = [];
      // TODO: Get project roles from e.target.value.
      this.setState (() => ({
        projectRoles: projectRoles
      }));
    }

    handleSubmitMessage = () => {
      const { project } = this.props;
      const data = {
        recipientId: project.user,
        projectId: project._id,
        role: this.state.role,
        messageBody: this.state.messageBody
      }
      console.log("data", data);
      if(this.state.messageBody.length >= 5){
        fetch('/api/messages/', {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
          credentials: "include" // include session cookie
        })
        .then(res => res.json())
        .then(alert('message sent'))
        .catch(e => console.error("message error", e));
      } else {
        this.setState({
          status: "Your message must be at least 5 characters long."
        });
      }
    }
    handleModalToggle = () => {
      this.setState (() => ({contactModalIsActive: !this.state.contactModalIsActive}));
    };

    handleRequestClose = () => {
      this.setState (() => ({
        contactModalIsActive: false
      }));
    }; 

    componentDidMount() {
        var that = this;
        this.props.getProject(this.props.match.params.id, function(data) {
            that.setState({ project: data });
        })
    }
    render() {
        const { project } = this.props;
        console.log(this.state)
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
                                <h1 className="text-light">
                                    {!!project && project.projectName
                                        ? project.projectName
                                        : ""}
                                </h1>
                                <p className="mb-4 lead text-light">
                                    Created by:{" "}
                                    {!!project && project.ownerName
                                        ? project.ownerName
                                        : ""}
                                </p>
                                <button 
                                  onClick={this.handleModalToggle}
                                  className="btn btn-teal btn-block">
                                    Apply to Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactModal
                  isOpen={this.state.contactModalIsActive}
                  handleRequestClose={this.handleRequestClose}
                  handleSubmitMessage={this.handleSubmitMessage}
                  handleUpdateMessageBody={this.handleUpdateMessageBody}
                />
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
