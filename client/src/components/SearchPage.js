import React, { Component } from 'react';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      query: ''
    };
  }
  getResults = () => {
    fetch("/api/search" + this.props.location.search)
      .then(response => response.json())
      .then(data => {
        window.localStorage.setItem("projectList", JSON.stringify(data.results));
        this.setState({ query: data.query, projects: data.results });
      })
      .catch(err => console.log(err));
  };
  componentDidMount(){
    this.getResults();
  }
  render() {
    const projects = this.state.projects;
    return (
      <div>
        <div className="text-center mt-5">
          {this.state.query.length > 0 && <h3>Showing Results for: {this.state.query}</h3> }
        </div>
          {projects.map(project => (
            <div className="row" key={project._id}>
              <div className="col-md-8">
                <h2>{project.name}</h2>
              </div>
              <div className="col-md-4">
                <h4>{project.description}</h4>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

export default SearchPage;
