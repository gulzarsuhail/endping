import React from 'react';

import NewChat from './NewChat';
import ContactList from './ContactList';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: theme.drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: theme.drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}));

export default function ContactDrawer({
    drawerState,
    chats,
    currentUser,
    addNewChat,
    newChatError,
    setNewChatError,
    selectedChatID
}) {
    const classes = useStyle();
    const [drawerOpen, setDrawerOpen] = drawerState;

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <NewChat 
                addNewChat={addNewChat}
                newChatError={newChatError}
                setNewChatError={setNewChatError}    
            />
            <Divider />
            <ContactList 
                chats={chats}
                currentUser={currentUser}
                selectedChatID={selectedChatID}
            />
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <SwipeableDrawer
                    variant="temporary"
                    anchor='left'
                    open={drawerOpen}
                    onClose={()=>setDrawerOpen(false)}
                    onOpen={()=>(setDrawerOpen(true))}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
      </nav>
    );
}
