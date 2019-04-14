import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProjectField from "./ProjectField";
import { createProject } from "../../actions/project";
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
            defaultValue={data[0].value}
            data={data}
            valueField={valueField}
            textField={textField}
            onChange={input.onChange}
        />
        {touched && error}
        {console.log(data[0])}
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

const adaptFileEventToValue = delegate => e => {
    console.log(e.target.files[0]);
    delegate(e.target.files[0]);
};

const FileInput = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    meta: omitMeta,
    ...props
}) => (
    <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        accept="image/*"
        {...inputProps}
        {...props}
    />
);

export class NewProject extends Component {
    onSubmit = formValues => {
        console.log(formValues);
        this.props.createProject(formValues, this.props.history);
    };

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
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
                            <div className="form-row">
                                <form onSubmit={handleSubmit(this.onSubmit)}>
                                    <div>
                                        <label>Select Project Type</label>
                                        <Field
                                            name="projectType"
                                            component={renderDropdownList}
                                            data={type}
                                            valueField="value"
                                            textField="type"
                                        />
                                    </div>
                                    <div>
                                        <label>Roles Needed</label>
                                        <Field
                                            name="roles"
                                            component={renderMultiselect}
                                            data={[
                                                "Animators",
                                                "Story Writers",
                                                "Programmers",
                                                "3d Modelers"
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="ownerName"
                                            label="Owner Name"
                                            type="input"
                                            component={ProjectField}
                                        />
                                        <label>Project Deadline</label>
                                        <Field
                                            name="deadline"
                                            showTime={false}
                                            component={renderDateTimePicker}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="projectName"
                                            label="Project Name"
                                            type="input"
                                            component={ProjectField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="description"
                                            label="Project Description"
                                            type="textarea"
                                            component={ProjectField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="img"
                                            label="Upload Image"
                                            component={FileInput}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={pristine || submitting}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            disabled={pristine || submitting}
                                            onClick={reset}
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

export default connect(
    null,
    { createProject }
)(
    reduxForm({
        validate,
        form: "projectForm"
    })(withRouter(NewProject))
);
