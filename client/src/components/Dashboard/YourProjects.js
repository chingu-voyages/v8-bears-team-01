import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const YourProjects = props => {
  //this will become state.projects
  let arr = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="projects-list-container container">
        <h4 className="content-header" style={{ marginTop: "50px" }}>
          Your Projects
        </h4>

        <Link to="/newproject">
          <button className="btn btn-teal">Create project</button>
        </Link>
      </div>

      <div className="row" style={{ marginTop: "30px" }}>
        {arr.map((numb, index) => (
          <div className="col-sm-4" key={index}>
            <div
              className="card text-white bg-secondary m-0 mb-4 "
              style={{ width: "18rem" }}
            >
              {/*complete link below should be   /username/project/projectid*/}
              <Link to={`/${props.user.name}/project/`}>
                {" "}
                <img
                  className="card-img-top"
                  src="https://via.placeholder.com/100"
                  alt="Card image cap"
                />{" "}
              </Link>
              <div className="card-body">
                <h5 className="card-title">projectName</h5>
                <p className="card-text">description</p>

                <div className="float-right">
                  <a href="#" className="btn btn-primary">
                    <i className="fas fa-pen" />
                  </a>
                  {"  "}
                  <a href="#" className="btn btn-danger">
                    <i className="fas fa-trash" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
    //projects: state.project.user_projects
  };
}

export default connect(mapStateToProps)(YourProjects);
