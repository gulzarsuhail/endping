import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    messageTextBox: {
        flexGrow: 1,
        backgroundColor: "white"
    }
  }));

export default function NewMessage({newMessageHandler}) {

    const classes = useStyles();

    const [message, setMessage] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (message === "") return;
        else {
            newMessageHandler(message)
        }
        setMessage("");
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                id="outlined-textarea"
                label="Message"
                multiline
                variant="outlined"
                className={classes.messageTextBox}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
                <SendIcon />
            </Button>
        </form>
    );
}
