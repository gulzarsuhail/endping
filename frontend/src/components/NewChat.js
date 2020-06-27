import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        overflow: "hidden",
        margin: 0,
        '& > *': {
            boxSizing: "border-box",
            margin: theme.spacing(1),
            width: `calc(100% - ${2*theme.spacing(1)}px)`,
        },
    },
    textField: {
        marginTop: theme.spacing(2),
    }
}));

const  Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function NewChat({addNewChat, newChatError, setNewChatError}) {
    const classes = useStyle();

    const [username, setUsername] = useState("");

    const [newChatSuccessMessage, setNewChatSuccessMessage] = useState("");

    const handleSuccessMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setNewChatSuccessMessage("");
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        const usernameREGEX = /^([a-zA-Z0-9_-]){5,32}$/
        if (username === "") {
            setNewChatError("Username cannot be empty");
        } else if (usernameREGEX.test(username)){
            setNewChatError(null);
            addNewChat({username: username})
            .then(()=> {
                setNewChatSuccessMessage(`New chat request sent sucessfully to ${username}`);
                setUsername("");
            }).catch(() => {});
        } else {
            setNewChatError("Invalid username");
        }
    }

    return (
        <form className={classes.root} onSubmit={onSubmitHandler}>
            <Typography variant="button" color="primary">New chat</Typography>
            {   (!!newChatError)
                ?
                (<TextField
                    error
                    helperText={newChatError}
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    label="Username"
                    fullWidth
                    variant="outlined"
                    size="small"
                    className={classes.textField} 
                />)
                :
                (<TextField
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    label="Username"
                    fullWidth
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                />)
            }
            <Button variant="contained" type="submit" color="primary">Send Request</Button>
            <Snackbar open={newChatSuccessMessage !== ""} autoHideDuration={6000} onClose={handleSuccessMessageClose}>
                <Alert onClose={handleSuccessMessageClose} severity="success">
                    {newChatSuccessMessage}
                </Alert>
            </Snackbar>
        </form>
    );
}
