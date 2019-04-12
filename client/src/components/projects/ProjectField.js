import React from "react";

const ProjectField = ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} />
        {touched && error}
      </div>
    </div>
  );
};

export default ProjectField;
