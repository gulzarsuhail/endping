import { SET_LOGIN_ERROR, SET_NEW_CHAT_ERROR, SET_CONVERSATION_ERROR } from '../actionTypes';

export const setLoginError = error => ({
    type: SET_LOGIN_ERROR,
    error,
});

export const setNewChatError = error => ({
    type: SET_NEW_CHAT_ERROR,
    error,
});

export const setConversationError = error => ({
    type: SET_CONVERSATION_ERROR,
    error,
});