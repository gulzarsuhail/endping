import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../store/actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
	root: {
		flex: "0 1 auto",
	},
	rootSidebar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${theme.drawerWidth}px)`,
			marginLeft: theme.drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
		  	display: 'none',
		},
	},
	title: {
		flexGrow: 1,
	},
	titleText: {
		textDecoration: "none",
		color: theme.palette.primary.light,
		fontFamily: "'Satisfy', cursive",
	},
	appBar: {
		borderBottom: "2px solid " + theme.palette.primary.light
	}
}));


const NavBar = ({currentUser, logoutUser, location, handleDrawerToggle}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = (e) => {
		e.preventDefault();
		logoutUser();
		setAnchorEl(null);
	}

	return (
		<div className={classes.root, currentUser.isAuthenticated && classes.rootSidebar }>
			<AppBar color="transparent" className={classes.appBar} position="static">
				<Toolbar>
					{currentUser.isAuthenticated && 
						(<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
							onClick={handleDrawerToggle}
						>
							<MenuIcon />
						</IconButton>)
					}
					<Typography variant="h4" className={classes.title} >
						<Link to={'/'} className={classes.titleText}> endping</Link>
					</Typography>
					{currentUser.isAuthenticated 
						? (
							<div>
								<IconButton
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="primary"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>Delete Account</MenuItem>
									<MenuItem onClick={logout}>Logout</MenuItem>
								</Menu>
							</div>
						) :
							(location.pathname === '/login')
								?(<Button variant="contained" color="primary" to={'/'} component={Link}>Signup</Button>)
								:(<Button variant="contained" color="primary" to={'/login'} component={Link}>Login</Button>)
					}
				</Toolbar>
			</AppBar>
		</div>
	);
}
	
const mapStateToProps = ({currentUser}) => ({currentUser});	
export default withRouter(connect(mapStateToProps, {logoutUser})(NavBar));