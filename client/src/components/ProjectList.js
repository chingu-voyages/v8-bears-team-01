import React, { Component } from "react";
import { Link } from 'react-router-dom';

const card_style = {
    width: "18rem"
}

const Project = props => (
    <div className="card" style={card_style}>
        <Link to="/project/:id-placeholder"> <img className="card-img-top" src="https://via.placeholder.com/100" alt="Card image cap"/> </Link>
        <div className="card-body">
            <h5 className="card-title">{props.project.title}</h5>           
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Open Positions: {props.project.num_open_positions}</li>
            <li className="list-group-item">Team:</li>
        </ul>
    </div>
)

export class ProjectList extends Component {

    constructor(props) {
        super(props);
        // this.state = { projects: [] }
        this.state = {projects: [
            { 
                title: "Example Title 1",
                num_open_positions: 4,

            },
            { 
                title: "Example Title 2",
                num_open_positions: 42,

            },
            { 
                title: "Example Title 3",
                num_open_positions: 45,

            },
            { 
                title: "Example Title 4",
                num_open_positions: 32,

            }
        ]};
    }

    // componentDidMount() {
    //     fetch('http://localhost:4000/projects/')
    //         .then(response => {
    //             this.setState({projects: response.data});
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    // componentDidUpdate() {
    //     fetch('http://localhost:4000/projects/')
    //     .then(response => {
    //         this.setState({projects: response.data});
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })   
    // }

    projectList() {
        return this.state.projects.map((currentProject, i) => {
            return <Project project={currentProject} key={i} />;
        });
    }

    render() {
        return (
            <div className="projects-list-container">
                <h3>List of Projects</h3>
                <div className="card-deck">
                    { this.projectList() }
                </div>  
            </div>
        );
    }
}

export default ProjectList;
