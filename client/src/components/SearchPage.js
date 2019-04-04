import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      query: "",
      isLoading: false
    };
  }
  getResults = () => {
    fetch("/api/search" + this.props.location.search)
      .then(response => response.json())
      .then(data => {
        // window.localStorage.setItem("projectList", JSON.stringify(data.results));
        this.setState({
          query: data.query,
          projects: data.results,
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    this.getResults();
  }
  render() {
    const projects = this.state.projects;
    return (
      <div>
        <div className="projects-list-container container">
          <div className="text-center mt-5 mb-4">
            {this.state.isLoading &&(<div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>)}
            {!!this.state.query && this.state.query.length > 0 ? (
              <h3>Showing Results for: {this.state.query}</h3>
            ) : (
              <p>Please enter a valid search term</p>
            )}
          </div>
          <div className="row mb-5 justify-content-center">
            {this.state.projects.length === 0 && <p>No results found.</p>}
            {projects.map(project => (
              <div
                className="col-sm-12 col-md-6 col-lg-3 p-3"
                key={project._id}
              >
                <div className="card">
                  <Link to={"/project/:" + project._id}>
                    {" "}
                    <img
                      className="card-img-top"
                      src="https://via.placeholder.com/100"
                      alt="Card image cap"
                    />{" "}
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      {!!project.name && project.name}
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {!!project.description && project.description}
                    </li>
                    <li className="list-group-item">Team:</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
