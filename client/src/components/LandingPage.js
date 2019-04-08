import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Project = props => (
    <div className="col-sm-12 col-md-6 col-lg-3 pb-3" key={props.project._id}>
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
    state = {
        projects: [],
        pagProjects: [],
        isLoading: false,
        currentPage: 1,
        projectPerPage: 8
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        axios
            .get("/api/projects/")
            .then(resp => {
                const pagProjects = this.getPaginatedProjects(1, resp.data);
                console.log(resp.data);
                this.setState({
                    projects: resp.data,
                    isLoading: false,
                    pagProjects
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    //   projectList() {
    //     return this.state.projects.map((currentProject, i) => {
    //       return <Project project={currentProject} key={i} />;
    //     });
    //   }

    paginationNumbers = numArr => {
        return numArr.map(num => {
            return (
                <li
                    style={{
                        marginRight: "8px",
                        padding: "0",
                        listStyle: "none",
                        cursor: "pointer"
                    }}
                    id={num}
                    onClick={() => {
                        this.setCurrentPage(num);
                    }}
                >
                    {num}
                </li>
            );
        });
    };

    setCurrentPage = number => {
        const projects = this.getPaginatedProjects(number);
        this.setState({
            currentPage: Number(number),
            pagProjects: projects
        });
    };

    getPaginatedProjects = (
        current = this.state.currentPage,
        projects = this.state.projects
    ) => {
        const endIndex = current * this.state.projectPerPage;
        const startIndex = endIndex - this.state.projectPerPage;
        const paginatedProjects = projects.slice(startIndex, endIndex);
        return paginatedProjects;
    };

    render() {
        const pages = Math.ceil(
            this.state.projects.length / this.state.projectPerPage
        );
        const numbersArr = [];
        for (let i = 1; i <= pages; i++) {
            numbersArr.push(i);
        }
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
                <div className="card-deck">
                    {this.state.pagProjects.map((currentProject, i) => {
                        return <Project project={currentProject} key={i} />;
                    })}
                </div>
                <Link to="/newproject">
                    <button className="btn btn-teal">Add new project</button>
                </Link>

                <div>
                    <ul
                        style={{
                            margin: "0",
                            padding: "0",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        {this.paginationNumbers(numbersArr)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default LandingPage;
