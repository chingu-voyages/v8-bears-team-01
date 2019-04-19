import axios from "axios";
import {
    CREATE_PROJECT,
    GET_PROJECTS,
    GET_PROJECT,
    GET_USER_PROJECTS,
    DELETE_PROJECT
} from "./types";

export const createProject = (values, file, history) => async dispatch => {
    /* const uploadConfig = await axios.get("/api/upload", { file: file.name });

    delete axios.defaults.headers.common["Authorization"];

    await axios.put(uploadConfig.data.url, file, {
        headers: {
            "Content-Type": file.type
        }
    });

    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = token; */

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

export const get_user_projects = () => async dispatch => {
    const res = await axios.get("/api/user_projects");

    dispatch({ type: GET_USER_PROJECTS, payload: res.data });
};

export const delete_project = id => async dispatch => {
    const res = await axios.delete(`/api/projects/${id}`);
    try {
        dispatch({ type: DELETE_PROJECT, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};
