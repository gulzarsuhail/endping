import { setConversationError } from './errors';
import { SET_CONVERSATION, ADD_CONVERSATION_MESSAGE } from '../actionTypes';
import { apiCall } from '../../services/api';
import { encryptMessageForReciever, publicEncryptUsingAuthKey } from '../../services/encrypt';

export function setConversation (conversation) {
    return {
        type: SET_CONVERSATION,
        conversation,
    }
}

export function addConversationMessage (message) {
    return {
        type: ADD_CONVERSATION_MESSAGE,
        message,
    }
}

export const fetchConversation = (chatID) => dispatch => new Promise((resolve, reject) => {
    return apiCall(`/api/chats/${chatID}`, 'GET')
    .then(conv => {
        dispatch(setConversationError(null));
        dispatch(setConversation(conv));
        resolve();
    }).catch(err => {
        dispatch(setConversationError(err.message));
        reject();
    });
});

export const sendNewMessage = (chatID, recieverPublicKey, message) => dispatch => new Promise((resolve, reject) => {
    const outboundMessage = {
        senderMessage: publicEncryptUsingAuthKey(message),
        recieverMessage: encryptMessageForReciever (recieverPublicKey, message),
    }
    alert("HERE")
    return apiCall(`/api/chats/${chatID}`, 'POST', outboundMessage)
    .then(res => {
        dispatch (addConversationMessage(res))
        resolve();
    }).catch(() => {
        dispatch(setConversationError(`Error sending message ${message}`));
        reject();
    })
});