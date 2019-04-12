import { FETCH_USER } from "../actions/types";
import { GET_AUTH_TOKEN } from "../actions/types";

const initialState = {
  user_id: [],
  token: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state, user_id: action.payload
      };
    case GET_AUTH_TOKEN:
      return {
        ...state, token: action.payload
      }
    default:
      return state;
  }
}
