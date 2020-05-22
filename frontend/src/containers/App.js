import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { configureStore } from '../store';
import NavBar from './NavBar';
import Main from './Main';

function App() {

	const store = configureStore();

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
