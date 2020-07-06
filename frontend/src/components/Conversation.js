import React from 'react';

import NewMessage from './NewMessage';
import Message from './Message';

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
        padding: "10px 20px",
        boxSizing: "border-box",
    },
    newMessageContainer: {
        backgroundColor: "#fafafa",
        zIndex: 10,
    },
    startChat: {
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
    }
}));

const Conversation = ({conversation, error, sendNewMessage}) => {

    const classes = useStyles();
    const conv = (!!conversation)
        ? conversation.messages.map(msg => (
            <Message key={msg._id} msg={msg} />
        )) : [];

    return (
        <div className={classes.root}>
            {!!conversation ? (
                <Container elevation={1} square={true} maxWidth="md" component={Paper} className={classes.messagesContainer}>
                    { conv }
                </Container>
            ) : (
                <Container maxWidth="md" className={classes.startChat}>
                    LOADING WALA DIV
                </Container>
            )}
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