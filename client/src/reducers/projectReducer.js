import { CREATE_PROJECT, GET_PROJECTS, GET_PROJECT } from "../actions/types";

const initialState = {
    projects: [],
    project: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PROJECT:
            return action.payload;
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload
            };
        default:
            return state;
    }
}
