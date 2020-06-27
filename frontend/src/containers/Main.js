import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { signupUser, loginUser } from '../store/actions/auth'
import { setLoginError } from '../store/actions/errors';

import Homepage from '../components/Homepage';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Chats from './Chats';

const Main = ({signupUser, loginUser, errors, setLoginError, currentUser, drawerState, ...props}) => {

	const removeError = () => setLoginError(null);

	// #TODO: Use HOCS to redirect routes based on login status
	return (
		<React.Fragment>
			<Switch>
				{/* #TODO: Use HOCS instead of if else */}
				<Route 
					path="/"
					exact
					render={
						props => {
							if (currentUser.isAuthenticated ) {
								props.history.push("/chats");
							} else {
								return (<Homepage {...props} />)
							}
						}
					}
				/>
				{/* #TODO: Use HOCS instead of if else */}
				<Route 
					path={["/chats/:chatID", "/chats/"]}
					render = {
						props => {
							if (!currentUser.isAuthenticated) {
								props.history.push("/");
							} else {
								return (<Chats {...props} currentUser={currentUser} drawerState={drawerState} />)
							}
						}
					}
				/>
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

export default connect(mapStateToProps, {signupUser, loginUser, setLoginError})(Main);