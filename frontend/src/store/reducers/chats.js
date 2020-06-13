import { CREATE_NEW_CHAT, SET_CHATS } from '../actionTypes';

const defaultState = [];

export default  (state=defaultState, action) => {
    switch (action.type) {
        case SET_CHATS:
            return (action.chats);
        case CREATE_NEW_CHAT:
            return ([
                ...state,
                action.chat,
            ]);
        default:
            return state;
    }
}