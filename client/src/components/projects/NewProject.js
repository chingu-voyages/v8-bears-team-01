import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProjectField from "./ProjectField";
import { createProject } from "../../actions/project";

const FIELDS = [
    { label: "Your Name", name: "ownerName" },
    { label: "Deadline", name: "deadline" },
    { label: "Project Name", name: "projectName" },
    { label: "Project Description", name: "description" }
];

export class NewProject extends Component {
    renderFields() {
        return FIELDS.map(({ label, name }) => (
            <Field
                key={name}
                component={ProjectField}
                type="text"
                label={label}
                name={name}
            />
        ));
    }

    onSubmit = formValues => {
        this.props.createProject(formValues, this.props.history);
    };

    render() {
        return (
            <div>
                Add Your Project Describe your project. Detailed projects get
                more volunteers!
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    FIELDS.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide a ${name}`;
        }
    });

    return errors;
}

export default connect(
    null,
    { createProject }
)(
    reduxForm({
        validate,
        form: "projectForm"
    })(withRouter(NewProject))
);
