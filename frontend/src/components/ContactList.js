import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatBubbleOutlinedIcon from '@material-ui/icons/ChatBubbleOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    labelText: {
        boxSizing: "border-box",
        width: `calc(100% - ${2*theme.spacing(1)}px)`,
        margin: theme.spacing(1),
    },
}));

export default function ContactList({chats, currentUser, selectedChatID}) {

    const classes = useStyle();

    const contactList = chats.map((chat, index) => (
        <ListItem selected={selectedChatID === chat._id}  button key={chat._id} component={Link} to={`/chats/${chat._id}`} >
            <ListItemIcon>{index % 2 === 0 ? <ChatBubbleOutlinedIcon /> : <MessageOutlinedIcon />}</ListItemIcon>
            <ListItemText primary={(chat.initiator === currentUser.user.username) ? chat.reciepient : chat.initiator } />
        </ListItem>
    ));

    return (
        <div className={classes.root}>
            <Typography className={classes.labelText} variant="button" color="primary">MY CHATS</Typography>
            <List>
                { contactList }
            </List>
        </div>
    );
}
