import { setConversationError } from './errors';
import { SET_CONVERSATION, ADD_CONVERSATION_MESSAGE } from '../actionTypes';
import { apiCall } from '../../services/api';
import {
    encryptMessageForReciever,
    publicEncryptUsingAuthKey,
    privateDecryptUsingAuthKey,
    decryptMessageAsReciever
} from '../../services/encrypt';

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

export const fetchConversation = (chatID, username) => dispatch => new Promise((resolve, reject) => {
    return apiCall(`/api/chats/${chatID}`, 'GET')
    .then(conv => {
        dispatch(setConversationError(null));
        conv.messages = conv.messages.map(message => {
            let defaultMessage = {
                time: message.time,
                _id: message._id,
            }
            if (message.sender === username){
                return ({
                    ...defaultMessage,
                    sender: true,
                    message: privateDecryptUsingAuthKey(message.senderMessage),
                });
            } else {
                return ({
                    ...defaultMessage,
                    sender: false,
                    message: decryptMessageAsReciever(conv.partnerKey, message.recieverMessage),
                })
            }
        });
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
    return apiCall(`/api/chats/${chatID}`, 'POST', outboundMessage)
    .then(res => {
        const newMessage = {
            time: res.time,
            message,
            sender: true,
            _id: res._id
        }
        dispatch (addConversationMessage(newMessage))
        resolve();
    }).catch((err) => {
        console.log(err);
        dispatch(setConversationError(`Error sending message ${message}`));
        reject();
    })
});