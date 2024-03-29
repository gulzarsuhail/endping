import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchChatList, addNewChat } from '../store/actions/chats';
import { setNewChatError } from '../store/actions/errors';
import { fetchConversation, setConversation, sendNewMessage } from '../store/actions/conversation';

import Conversation from '../components/Conversation';
import ContactDrawer from '../components/ContactDrawer';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: "1 1 auto",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "row",
    },
}));

function Chats({
    drawerState,
    chats,
    fetchChatList,
    addNewChat,
    currentUser,
    newChatError,
    setNewChatError,
    conversation,
    fetchConversation,
    conversationError,
    setConversation,
    sendNewMessage,
}) {
    
    const classes = useStyles();
    
    const getChatList = useCallback(fetchChatList);
    const { chatID } = useParams();
    
    useEffect(()=> {
        getChatList();
    }, [getChatList]);
    
    useEffect(() => {
        if (!!chatID) {
            fetchConversation(chatID, currentUser.user.username)
            .catch(()=> {});
        } else {
            setConversation(null);
        }
    }, [chatID, fetchConversation, setConversation, currentUser]);

    return (
        <div className={classes.root}>
            <ContactDrawer
                drawerState={drawerState}
                newChatError={newChatError}
                addNewChat={addNewChat}
                currentUser={currentUser}
                chats={chats}
                setNewChatError={setNewChatError}
                selectedChatID={chatID}
            />
            { !!chatID ?
                (<Conversation 
                    conversation={conversation}
                    error={conversationError}
                    sendNewMessage={sendNewMessage}
                />) 
                :
                (<div>
                    START NEW CHAT DIV
                </div>)
            }
        </div>
    );
}

const mapStateToProps = ({chats, currentUser, errors, conversation}) => (
    {
        currentUser,
        chats,
        newChatError: errors.newChat,
        conversation,
        conversationError: errors.conversation,
    }
);

export default connect(mapStateToProps, {
    fetchChatList,
    addNewChat,
    setNewChatError,
    fetchConversation,
    setConversation,
    sendNewMessage,
})(Chats);