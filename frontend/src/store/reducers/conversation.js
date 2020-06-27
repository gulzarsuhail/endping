import { SET_CONVERSATION, ADD_CONVERSATION_MESSAGE } from '../actionTypes';

const defaultConversation = null;

export default (state = defaultConversation, action) => {
    switch (action.type) {
        case SET_CONVERSATION:
            return action.conversation;
        case ADD_CONVERSATION_MESSAGE: {
            if (state !== null){
                return({
                    ...state,
                    messages: [...state.messages, action.messages],
                })
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}