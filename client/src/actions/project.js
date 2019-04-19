import axios from "axios";
import {
  CREATE_PROJECT,
  GET_PROJECTS,
  GET_PROJECT,
  GET_USER_PROJECTS
} from "./types";

export const createProject = (values, history) => async dispatch => {
  const res = await axios.post("/api/projects", values);

  dispatch({ type: CREATE_PROJECT, payload: res.data });
  history.push("/");
};

export const getProjects = () => async dispatch => {
  const res = await axios.get("/api/projects");

  dispatch({ type: GET_PROJECTS, payload: res.data });
};

export const getProject = (id, cb) => async dispatch => {
  const res = await axios.get(`/api/projects/${id}`);
  cb( res.data );
  dispatch({ type: GET_PROJECT, payload: res.data });
};

export const get_user_projects = userID => async dispatch => {
  const res = await axios.get(`/api/${userID}/projects`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
  });
  dispatch({ type: GET_USER_PROJECTS, payload: res.data });
};
