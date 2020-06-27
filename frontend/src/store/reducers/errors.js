import { SET_LOGIN_ERROR, SET_NEW_CHAT_ERROR, SET_CONVERSATION_ERROR } from '../actionTypes';

const defaultState = {
    login: null,
    newChat: null,
    conversation: null,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_LOGIN_ERROR:
            return {
                ...state,
                login: action.error,
            };
        case SET_NEW_CHAT_ERROR:
            return {
                ...state,
                newChat: action.error,
            };
        case SET_CONVERSATION_ERROR:
            return {
                ...state,
                conversation: action.error,
            };
        default:
            return state
    }
}