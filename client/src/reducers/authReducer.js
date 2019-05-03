import { FETCH_USER, GET_AUTH_TOKEN, UPDATE_USER } from "../actions/types";

const initialState = {
 
    name: '',
    job_title: '',
    location: '',
    about: '',
    picture: '',
    token: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
    const { name, email, job_title, location, picture, about } = action.payload
      return {
        ...state,
        name,
        email,
        location,
        about,
        picture,
        job_title
      };
    case GET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case UPDATE_USER:
    return {
      ...state,
      name: action.payload.name,
      location: action.payload.location,
      about: action.payload.about,
      picture: action.payload.picture,
      job_title: action.payload.job_title
    }
   
    default:
      return state;
  }
}
