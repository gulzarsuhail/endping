import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { fetchChatList, addNewChat } from '../store/actions/chats';
import { setNewChatError } from '../store/actions/errors';

import ContactDrawer from '../components/ContactDrawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: "1 1 auto",
    },
}));

function Chats({drawerState, chats, fetchChatList, addNewChat, currentUser, newChatError, setNewChatError}) {
    const classes = useStyles();

    const getChatList = useCallback(fetchChatList);

    useEffect(()=> {
        getChatList();
    }, [getChatList]);

    return (
        <div className={classes.root}>
            <ContactDrawer
                drawerState={drawerState}
                newChatError={newChatError}
                addNewChat={addNewChat}
                currentUser={currentUser}
                chats={chats}
                setNewChatError={setNewChatError}
            />
            {/* #TODO: Add chats here */}
        </div>
    );
}

const mapStateToProps = ({chats, currentUser, errors}) => ({chats, currentUser, newChatError: errors.newChat});

export default connect(mapStateToProps, {fetchChatList, addNewChat, setNewChatError})(Chats);