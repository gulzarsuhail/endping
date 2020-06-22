import { setNewChatError } from './errors';
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

export const fetchChatList = () => dispatch => new Promise((resolve, reject) => {
    return apiCall("/api/chats", 'GET')
    .then(chats => {
        dispatch(setNewChatError(null));
        dispatch(setChats(chats));
        resolve();
    }).catch(err => {
        dispatch(setNewChatError(err.message));
        reject();
    });
});

export const addNewChat = user => dispatch => new Promise((resolve, reject) => {
    return apiCall("/api/chats", 'POST', user)
    .then(chat => {
        dispatch(setNewChatError(null));
        dispatch(addChat(chat));
        resolve();
    }).catch(err => {
        dispatch(setNewChatError(err.message));
        reject();
    });
});