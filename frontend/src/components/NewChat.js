import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
}));

export default function NewChat() {

    const classes = useStyle();

    return (
        <form className={classes.root}>
            <Typography variant="button" color="primary">New chat</Typography>
            <TextField id="outlined-basic" label="Username" fullWidth variant="outlined" size="small"  />
            <Button variant="contained" color="primary">Send Request</Button>
        </form>
    );
}
