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
    },
    messagesContainer: {
        backgroundColor: "yellow",
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
    },
    newMessageContainer: {
        backgroundColor: "#fafafa",
    }
}));

const Conversation = ({conversation, error, sendNewMessage}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.messagesContainer}>
                asd
            </Container>
            {!!conversation &&
                (<Paper className={classes.newMessageContainer} elevation={3}>
                    <Container maxWidth="md" disableGutters={true}>
                        <NewMessage
                            newMessageHandler={
                                message => {
                                    alert("JAJDKJASDJLDJKL")
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