import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProjectField from "./ProjectField";
import { editProject, get_user_projects } from "../../actions/project";
import DropdownList from "react-widgets/lib/DropdownList";
import Multiselect from "react-widgets/lib/Multiselect";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocaliser from "react-widgets-moment";

import "react-widgets/dist/css/react-widgets.css";

momentLocaliser(moment);

const type = [
    { type: "Game Development", value: "Game Development" },
    { type: "Web Development", value: "Web Development" }
];

const renderDropdownList = ({
    input,
    data,
    valueField,
    textField,
    meta: { error, touched }
}) => (
    <div>
        <DropdownList
            {...input}
            data={data}
            valueField={valueField}
            textField={textField}
            onChange={input.onChange}
        />
        {touched && error}
    </div>
);

const renderMultiselect = ({
    input,
    data,
    valueField,
    textField,
    meta: { error, touched }
}) => (
    <div>
        <Multiselect
            {...input}
            onBlur={() => input.onBlur()}
            value={input.value || []}
            data={data}
            valueField={valueField}
            textField={textField}
        />
        {touched && error}
    </div>
);

const renderDateTimePicker = ({
    input: { onChange, value },
    showTime,
    meta: { error, touched }
}) => (
    <div>
        <DateTimePicker
            onChange={onChange}
            format="DD MMM YYYY"
            time={showTime}
            value={!value ? null : new Date(value)}
        />
        {touched && error}
    </div>
);

export class NewProject extends Component {
    state = {
        file: null,
        type: null
    };

    componentWillReceiveProps(nextProps, nextState) {
        const { values } = nextProps.type;
        if (values) {
            this.setState({
                type: values
            });
        }
    }

    onSubmit = formValues => {
        this.props.editProject(
            this.props.match.params.id,
            formValues,
            this.props.history
        );
    };

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        const data =
            this.state.type &&
            pristine &&
            !reset &&
            this.state.type.projectType.type === "Game Development"
                ? ["Animators", "Story Writers", "Programmers", "3d Modelers"]
                : [
                      "Front End Developer",
                      "Back End Developer",
                      "Full Stack Developer",
                      "UI/UX Designer"
                  ];

        return (
            <div>
                <div className="py-5 text-center text-white">
                    <div className="mx-auto col-md-10 p-4">
                        <h1 className="text-light">Add your project</h1>
                        <p className="mb-4 lead text-light">
                            Describe your project in detail. Detailed projects
                            get more volunteers!
                        </p>
                        <div className="container">
                            <div
                                className="form-row"
                                style={{
                                    display: "flexbox",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <form onSubmit={handleSubmit(this.onSubmit)}>
                                    <div className="form-group">
                                        <label
                                            style={{
                                                fontSize: "1.6rem"
                                            }}
                                        >
                                            Select Project Type
                                        </label>
                                        <Field
                                            name="projectType"
                                            component={renderDropdownList}
                                            data={type}
                                            valueField="value"
                                            textField="type"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            style={{
                                                fontSize: "1.6rem"
                                            }}
                                        >
                                            Roles Needed
                                        </label>
                                        <Field
                                            name="roles"
                                            component={renderMultiselect}
                                            data={data}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            name="ownerName"
                                            label="Owner Name"
                                            type="input"
                                            component={ProjectField}
                                            className="form-control"
                                        />
                                        <label
                                            style={{
                                                fontSize: "1.6rem"
                                            }}
                                        >
                                            Project Deadline
                                        </label>
                                        <Field
                                            name="deadline"
                                            showTime={false}
                                            component={renderDateTimePicker}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            name="projectName"
                                            label="Project Name"
                                            type="input"
                                            component={ProjectField}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            name="description"
                                            label="Project Description"
                                            type="textarea"
                                            component={ProjectField}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            style={{
                                                fontSize: "1.6rem"
                                            }}
                                        >
                                            Upload Image for project
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={this.onFileChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            disabled={pristine || submitting}
                                            className="form-control"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            disabled={pristine || submitting}
                                            onClick={reset}
                                            className="form-control"
                                        >
                                            Reset Values
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.projectType) {
        errors.projectType = "You must select a project type";
    }

    if (!values.roles) {
        errors.roles = "You must select role(s) for the project";
    }

    if (!values.ownerName) {
        errors.ownerName = "You must enter a name";
    }

    if (!values.deadline) {
        errors.deadline = "You must select a project deadline";
    }

    if (!values.projectName) {
        errors.projectName = "You must enter a project name";
    }

    if (!values.description) {
        errors.description = "You must provide a project description";
    }

    return errors;
}

const mapStateToProps = state => {
    return {
        project: state.project.user_projects,
        type: state.form.projectForm
    };
};

export default connect(
    mapStateToProps,
    { editProject, get_user_projects }
)(
    reduxForm({
        validate,
        form: "projectForm"
    })(withRouter(NewProject))
);
