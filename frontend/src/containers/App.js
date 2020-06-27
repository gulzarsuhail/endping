import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { configureStore } from '../store';
import { setAuthPrivateKey, setAuthServerPublicKey, setAuthorizationToken, setCurrentUser, setAuthPublicKey } from '../store/actions/auth';

import NavBar from './NavBar';
import Main from './Main';

import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#ab47bc',
		},
		secondary: {
			main: '#d81b60',
		},
	},
	drawerWidth: 240,
});

const useStyles = makeStyles((theme) => ({
	app: {
		display: "flex",
		flexFlow: "column",
		height: "100%"
	}
}));

const store = configureStore();

// read and validate local storage data if any
if (localStorage.jwtToken && localStorage.priKey && localStorage.serverKey) {
	try {
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
		setAuthPrivateKey(localStorage.priKey);
		setAuthPublicKey(localStorage.pubKey);
		setAuthServerPublicKey(localStorage.serverKey);
		setAuthorizationToken(localStorage.jwtToken);
	} catch (err) {
        localStorage.clear();
        store.dispatch(setCurrentUser({}));
        setAuthorizationToken(false);
	}
}


function App() {

	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	}

	return (
		<Provider store={store}>
			<Router>
				<ThemeProvider theme={theme}>
					<div className={classes.app}>
						<NavBar handleDrawerToggle={handleDrawerToggle} />
						<Main drawerState={[drawerOpen, setDrawerOpen]} />
					</div>
				</ThemeProvider>
			</Router>
		</Provider>
	);
}

export default App;
