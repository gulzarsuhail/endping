import { addError, removeError } from './errors';
import { CREATE_NEW_CHAT, SET_CHATS } from '../actionTypes';
import { apiCall } from '../../services/api';

export function setChats (chats) {
    return {
        type: SET_CHATS,
        chats,
    }
}

export function addChat (chat) {
    return {
        type: CREATE_NEW_CHAT,
        chat,
    }
}

export const fetchAllChats = () => dispatch => new Promise((resolve, reject) => {
    return apiCall("/api/chats", 'GET')
    .then(chats => {
        dispatch(removeError());
        dispatch(setChats(chats));
        resolve();
    }).catch(err => {
        dispatch(addError(err.message));
        reject();
    });
});

export const addNewChat = chat => dispatch => new Promise((resolve, reject) => {
    return apiCall("/api/chats", 'POST')
    .then(chats => {
        dispatch(removeError());
        dispatch(addChat(chat));
        resolve();
    }).catch(err => {
        dispatch(addError(err.message));
        reject();
    });
});