import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { signupUser, loginUser } from '../store/actions/auth'
import { removeError } from '../store/actions/errors';

import Homepage from '../components/Homepage';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Main = ({signupUser, loginUser, errors, removeError, currentUser}) => {
  return (
	<React.Fragment>
		<Switch>
			<Route path="/" exact render={ props => <Homepage {...props} currentUser={currentUser} /> } />
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

export default withRouter(connect(mapStateToProps, {signupUser, loginUser, removeError})(Main));