import axios from "axios";
import { CREATE_PROJECT, GET_PROJECTS, GET_PROJECT } from "./types";

export const createProject = (values, history) => async dispatch => {
    const res = await axios.post("/api/projects", values);

    dispatch({ type: CREATE_PROJECT, payload: res.data });
    history.push("/");
};

export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/projects");

    dispatch({ type: GET_PROJECTS, payload: res.data });
};

export const getProject = id => async dispatch => {
    const res = await axios.get(`/api/projects/${id}`);
    dispatch({ type: GET_PROJECT, payload: res.data });
};
