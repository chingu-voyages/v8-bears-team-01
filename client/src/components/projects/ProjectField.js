import React from "react";

const ProjectField = ({ input, label, type, meta: { error, touched } }) => {
    return (
        <div>
            <label style={{ fontSize: "1.6rem" }}>{label}</label>
            <div>
                <input {...input} type={type} className="form-control" />
                {touched && <span style={{ color: "#6dd1cc" }}>{error}</span>}
            </div>
        </div>
    );
};

export default ProjectField;
