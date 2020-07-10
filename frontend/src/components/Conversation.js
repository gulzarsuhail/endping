import React, { useRef, useEffect } from 'react';

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
        backgroundColor: "#fdfdfd"
    },
    newMessageContainer: {
        backgroundColor: "#fafafa",
        zIndex: 10,
    },
}));

const Conversation = ({conversation, error, sendNewMessage}) => {

    const classes = useStyles();

    var convEndRef = useRef();

    const conv = (!!conversation)
        ? conversation.messages.map(msg => (
            <Message key={msg._id} msg={msg} />
        )) : [];

    useEffect(()=> {
        convEndRef.current.scrollTop = convEndRef.current.scrollHeight;
    }, [conv])

    return (
        <div className={classes.root}>
                <Container ref={convEndRef} elevation={2} square={true} maxWidth="md" component={Paper} className={classes.messagesContainer}>
                    {!!conversation ? (
                            conv 
                    ) : (
                        <h1>LOADING WALA DIV</h1>
                    )}
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