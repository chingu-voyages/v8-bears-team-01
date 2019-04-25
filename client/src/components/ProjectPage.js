import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject, delete_project } from "../actions/project";

class ProjectPage extends Component {
    constructor() {
        super();
        this.state = {
            success: false,
            project: {}
        };
    }

    componentDidMount() {
        var that = this;
        this.props.getProject(this.props.match.params.id, function(data) {
            that.setState({ project: data });
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
