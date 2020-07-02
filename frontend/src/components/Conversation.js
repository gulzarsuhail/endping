import React from 'react';

import NewMessage from './NewMessage'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    messagesContainer: {
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        overflowY:"scroll",
    },
    newMessageContainer: {
        backgroundColor: "#fafafa",
    }
}));

const Conversation = ({conversation, error, sendNewMessage}) => {

    const classes = useStyles();
    const conv = (!!conversation)
        ? conversation.messages.map(msg => (
            <div key={msg._id}>
                <span>{msg.sender ? "ME " : "HIM "}</span>
                {msg.message}
            </div>
        ))
        : [];
    
    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.messagesContainer}>
                {!!conversation 
                    ?
                        conv
                    : (
                        <div>Start a chat</div>
                    )
                }
            </Container>
            {!!conversation &&
                (<Paper className={classes.newMessageContainer} elevation={3}>
                    <Container maxWidth="md" disableGutters={true}>
                        <NewMessage
                            newMessageHandler={
                                message => {
                                    sendNewMessage(conversation._id, conversation.partnerKey, message)
                                }
                            }
                        />
                    </Container>
                </Paper>)
            }
        </div>
    );
};

export default Conversation;