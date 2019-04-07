import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Project = props => (
    <div
      className="col-sm-12 col-md-6 col-lg-3 pb-3"
      key={props.project._id}
    >
      <div className="card text-white bg-secondary m-0 mb-4">
          <Link to={"/project/:" + props.project._id}>
              {" "}
              <img
                  className="card-img-top"
                  src="https://via.placeholder.com/100"
                  alt="Card image cap"
              />{" "}
          </Link>
          <div class="card-body">
          <h5 class="card-title">{props.project.projectName}</h5>
          <p class="card-text">{props.project.description}</p>
          </div>
      </div>
    </div>
);

export class LandingPage extends Component {
    // this.state = { projects: [] }

    state = {
        projects: [],
        isLoading: false
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        axios
            .get("/api/projects/")
            .then(resp => {
                this.setState({ projects: resp.data, isLoading: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    projectList() {
        return this.state.projects.map((currentProject, i) => {
            return <Project project={currentProject} key={i} />;
        });
    }

    render() {
        return (
          <div className="projects-list-container container">
            <h3 className="pb-5 pt-5 content-header">
                Latest Projects{" "}
                {this.state.isLoading && (
                    <div
                        className="spinner-border spinner-border-sm"
                        style={{ width: "2rem", height: "2rem" }}
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
              </h3>
              <div className="card-deck">{this.projectList()}</div>
              <Link to="/newproject">
                  <button className="btn btn-teal">Add new project</button>
              </Link>
          </div>
        );
    }
}

export default LandingPage;
