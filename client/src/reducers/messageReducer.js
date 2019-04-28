import {
  SEND_MESSAGE,
  GET_SENT_MESSAGES,
  GET_RECEIVED_MESSAGES,
  DELETE_MESSAGE
} from "../actions/types";

const initialState = {
  message: {},
  received_messages: [],
  sent_messages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
      case SEND_MESSAGE:
          return action.payload;
      case GET_SENT_MESSAGES:
          return {
              ...state,
              sent_messages: action.payload
          };
      case GET_RECEIVED_MESSAGES:
          return {
              ...state,
              received_messages: action.payload
          };
      case DELETE_MESSAGE:
          return {
              ...state,
              received_message: state.user_projects.filter(
                  project => project._id !== action.payload
              )
          };
      default:
          return state;
  }
}
