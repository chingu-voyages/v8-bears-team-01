import axios from "axios";
import { CREATE_PROJECT } from "./types";

export const createProject = (values, history) => async dispatch => {
    const res = await axios.post("/api/projects", values);

    dispatch({ type: CREATE_PROJECT, payload: res.data });
    history.push("/");
};
