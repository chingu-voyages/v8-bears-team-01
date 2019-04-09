import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../actions/project";

class ProjectPage extends Component {
    componentDidMount() {
        this.props.getProject(this.props.match.params.id);
    }
    render() {
        const { project } = this.props;
        return (
            <div>
                <div className="py-5 text-white">
                    <div className="mx-auto col-md-10">
                        <div className="project-container row">
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <img
                                    className="project-page-img"
                                    src="https://i.imgur.com/nZ22mf9.jpg"
                                />
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <h1 className="text-light">
                                    {project.projectName}
                                </h1>
                                <p className="mb-4 lead text-light">
                                    Created by:{" "}
                                    {!!project.ownerName && project.ownerName}
                                </p>
                                <p>
                                    Deadline:{" "}
                                    {!!project.deadline && project.deadline}
                                </p>
                                <p>
                                    Description:{" "}
                                    {!!project.description &&
                                        project.description}
                                </p>
                                <button className="btn btn-teal">
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
