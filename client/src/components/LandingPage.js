import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const card_style = {
    width: "18rem"
};

const Project = props => (
    <div
      className="col-sm-12 col-md-6 col-lg-3 p-3"
      key={props.project._id}
    >
      <div className="card">
          <Link to="/project/:id-placeholder">
              {" "}
              <img
                  className="card-img-top"
                  src="https://via.placeholder.com/100"
                  alt="Card image cap"
              />{" "}
          </Link>
          <div className="card-body">
              <h5 className="card-title">{props.project.projectName}</h5>
          </div>
          <ul className="list-group list-group-flush">
              <li className="list-group-item">
                  Open Positions: {props.project.num_open_positions}
              </li>
              <li className="list-group-item">Team:</li>
          </ul>
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
                <h3 className="pb-4 pt-4">
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
                    <button>Add new project</button>
                </Link>
            </div>
        );
    }
}

export default LandingPage;
