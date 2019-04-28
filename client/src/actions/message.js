import axios from "axios";
import {
    SEND_MESSAGE,
    GET_SENT_MESSAGES,
    GET_RECEIVED_MESSAGES,
    DELETE_MESSAGE
} from "./types";

export const sendMessage = (values) => async dispatch => {
    const res = await axios.post("/api/messages", values);
    dispatch({ type: SEND_MESSAGE, payload: res.data });
};

export const getSentMessages = (senderId) => async dispatch => {
    const res = await axios.get(`/api/messages/?sender=${senderId}`);
    dispatch({ type: GET_SENT_MESSAGES, payload: res.data });
};

export const getReceivedMessages = (recipientId) => async dispatch => {
    const res = await axios.get(`/api/messages/?recipient=${recipientId}`);
    dispatch({ type: GET_RECEIVED_MESSAGES, payload: res.data });
};

export const deleteMessage = id => async dispatch => {
    try {
        await axios.delete(`/api/messages/${id}`);
        dispatch({ type: DELETE_MESSAGE, payload: id });
    } catch (err) {
        console.log(err);
    }
};
