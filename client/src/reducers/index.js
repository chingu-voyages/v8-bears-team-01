import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import authReducer from "./authReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    project: projectReducer
});
