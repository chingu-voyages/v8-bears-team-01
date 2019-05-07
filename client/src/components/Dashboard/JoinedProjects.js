import React from "react";
import { Link } from "react-router-dom";

const JoinedProjects = () => {
    return (
        <>
            <div className="projects-list-container container">
                <h4 className="content-header" style={{ marginTop: "50px" }}>
                    Joined Projects
                </h4>
            </div>

            <div className="row" style={{ marginTop: "30px" }}>
                <div className="col-sm-4">
                    <div
                        className="card text-white bg-secondary m-0 mb-4 "
                        style={{ width: "18rem" }}
                    >
                        <Link to={"/project/"}>
                            {" "}
                            <img
                                className="card-img-top"
                                src="https://via.placeholder.com/100"
                                alt=""
                            />{" "}
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">projectName</h5>
                            <p className="card-text">description</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JoinedProjects;
