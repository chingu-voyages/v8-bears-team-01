import axios from "axios";
import {
    CREATE_PROJECT,
    GET_PROJECTS,
    GET_PROJECT,
    GET_USER_PROJECTS,
    EDIT_PROJECT,
    DELETE_PROJECT
} from "./types";

export const createProject = (values, file, history) => async dispatch => {
    const uploadConfig = await axios.get("/api/upload");

    if (file) {
        await axios.put(uploadConfig.data.url, file, {
            headers: {
                "Content-Type": file.type
            }
        });

        const res = await axios.post("/api/projects", {
            ...values,
            imageUrl: uploadConfig.data.key
        });

        dispatch({ type: CREATE_PROJECT, payload: res.data });
    } else {
        const res = await axios.post("/api/projects", values);

        dispatch({ type: CREATE_PROJECT, payload: res.data });
    }

    history.push("/dashboard");
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

export const editProject = (id, values, history) => async dispatch => {
    const res = await axios.put(`/api/projects/${id}`, values);

    dispatch({ type: EDIT_PROJECT, payload: res.data });

    history.push("/dashboard");
};

export const delete_project = id => async dispatch => {
    try {
        await axios.delete(`/api/projects/${id}`);
        dispatch({ type: DELETE_PROJECT, payload: id });
    } catch (err) {
        console.log(err);
    }
};
