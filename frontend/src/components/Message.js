import React from 'react';
import Moment from 'react-moment';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(style => ({
    root: {
        margin: "5px 0px",
        padding: "10px",
        width: "80%",
        overflow: "visible",
        backgroundColor: style.palette.primary.light,
        '& > *': {
            color: "white",
        },
    },
    received: {
        alignSelf: "flex-start",
    },
    sent: {
        alignSelf: "flex-end",
    },
    date: {
        float: "right",
    }
}));

const calendarStrings = {
    lastDay : '[yesterday at] LT',
    sameDay : '[today at] LT',
    lastWeek : '[last] dddd [at] LT',
    sameElse : 'L'
};

const Message = ({msg}) => {

    const classes = useStyles();

    return (
        <Card raised={true} elevation={1} className={`${classes.root} ${(msg.sender) ? classes.sent: classes.received}`}>
                <Typography variant="body1">
                    {msg.message}
                </Typography>
                <Typography variant="caption" className={classes.date} >
                    <Moment date={msg.time} calendar={calendarStrings} />
                </Typography>
        </Card>
    );
}

export default Message;
