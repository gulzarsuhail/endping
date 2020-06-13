import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { fetchAllChats } from '../store/actions/chats';

import ContactDrawer from '../components/ContactDrawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: "1 1 auto",
    },
}));

function Chats({drawerState, chats, fetchAllChats, currentUser}) {
    const classes = useStyles();

    const fetchChata = useCallback(fetchAllChats);

    useEffect(()=> {
        fetchChata();
    }, [fetchChata]);

    return (
        <div className={classes.root}>
            <ContactDrawer drawerState={drawerState} currentUser={currentUser} chats={chats} />
            {/* #TODO: Add chats here */}
        </div>
    );
}

const mapStateToProps = ({chats, currentUser}) => ({chats, currentUser});

export default connect(mapStateToProps, {fetchAllChats})(Chats);