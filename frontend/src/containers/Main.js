import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { signupUser, loginUser } from '../store/actions/auth'
import { setLoginError } from '../store/actions/errors';

import Homepage from '../components/Homepage';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Chats from './Chats';

const Main = ({signupUser, loginUser, errors, setLoginError, currentUser, drawerState}) => {

	const removeError = () => setLoginError(null);

	return (
		<React.Fragment>
			<Switch>
				<Route path="/" exact render={ props => {
					return currentUser.isAuthenticated
						? (<Chats {...props} currentUser={currentUser} drawerState={drawerState} />)
						: (<Homepage {...props} currentUser={currentUser}/>) 
				}} />
				<Route path="/signup" exact render={props =>
					<SignupForm {...props} onSubmitHandler={ signupUser } errors={errors} removeError={removeError} />
				}/>
				<Route path="/login" exact render={props =>
					<LoginForm {...props} onSubmitHandler={ loginUser } errors={errors} removeError={removeError} /> }
				/>
			</Switch>
		</React.Fragment>
	);
}

const mapStateToProps = ({currentUser, errors}) => ({
	currentUser,
	errors
});

export default withRouter(connect(mapStateToProps, {signupUser, loginUser, setLoginError})(Main));