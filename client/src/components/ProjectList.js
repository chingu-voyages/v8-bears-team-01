import React, { Component } from "react";
import { Link } from 'react-router-dom';

const Project = props => (
    <div className="card">
        <Link to="/project/:id-placeholder"> <img class="card-img-top" src="https://via.placeholder.com/150" alt="Card image cap"/> </Link>
        <div class="card-body">
            <h5 class="card-title">Project Title</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Open Positions:</li>
            <li class="list-group-item">Team:</li>
        </ul>
    </div>
)

export class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/projects/')
            .then(response => {
                this.setState({projects: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/projects/')
        .then(response => {
            this.setState({projects: response.data});
        })
        .catch((error) => {
            console.log(error);
        })   
    }

    projectList() {
        return this.state.project.map((currentProject, i) => {
            return <Project project={currentProject} key={i} />;
        });
    }

    render() {
        return (
            <div className="projects-list-container">
                <h3>List of Projects</h3>
                { this.projectList() }
            </div>
        );
    }
}

export default ProjectList;
