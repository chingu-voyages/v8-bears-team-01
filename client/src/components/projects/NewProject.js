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
          <div className="form-group col-md-6"> 
            <Field
                key={name}
                component={ProjectField}
                type="text"
                label={label}
                name={name}
                className="form-control"
            />
          </div>
        ));
    }

    onSubmit = formValues => {
        this.props.createProject(formValues, this.props.history);
    };

    render() {
        return (
          <div>
            <div className="py-5 text-center text-white">
              <div className="mx-auto col-md-10 p-4">
                <h1 className="text-light">Add your project</h1>
                <p className="mb-4 lead text-light">Describe your project in detail. Detailed projects get more volunteers!</p> 
                <div className="container">     
                  <div className="form-row">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                      {this.renderFields()}
                      <button className="btn btn-teal" type="submit">Submit</button>
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
