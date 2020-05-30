import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { configureStore } from '../store';
import { setAuthPrivateKey, setAuthServerPublicKey, setAuthorizationToken, setCurrentUser } from '../store/actions/auth';

import NavBar from './NavBar';
import Main from './Main';

const store = configureStore();


// read and validate local storage data if any
if (localStorage.jwtToken && localStorage.priKey && localStorage.serverKey) {
	try {
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
		setAuthPrivateKey(localStorage.priKey);
		setAuthServerPublicKey(localStorage.serverKey);
		setAuthorizationToken(localStorage.jwtToken);
	} catch (err) {
        localStorage.clear();
        store.dispatch(setCurrentUser({}));
        setAuthorizationToken(false);
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<NavBar />
					<Main />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
