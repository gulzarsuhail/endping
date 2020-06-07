import React from 'react';

import LeftDrawer from './LeftDrawer';


import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: theme.drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: theme.drawerWidth,
    }
}));

export default function Contacts({drawerState}) {
    const classes = useStyle();
    const [drawerOpen, setDrawerOpen] = drawerState;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <SwipeableDrawer
                    variant="temporary"
                    anchor='left'
                    open={drawerOpen}
                    onClose={()=>setDrawerOpen(!drawerOpen)}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <LeftDrawer />
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
                    <LeftDrawer />
                </Drawer>
            </Hidden>
      </nav>
    )
}
