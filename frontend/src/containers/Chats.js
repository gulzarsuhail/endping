import React from 'react';

import Contacts from '../components/Contacts';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: "1 1 auto",
    },
}));

export default function Chats({drawerState}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Contacts drawerState={drawerState} />
            {/* #TODO: Add chats here */}
        </div>
    );
}
