import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { signupUser } from '../store/actions/auth'

import Homepage from '../components/Homepage';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Main = ({signupUser}) => {
  return (
	<React.Fragment>
		<Switch>
			<Route path="/" exact render={ props => <Homepage {...props} /> } />
			<Route path="/signup" exact render={props =>
				<SignupForm {...props} onSubmitHandler={ signupUser } />
			}/>
			<Route path="/login" exact render={props => <LoginForm {...props} />} />
		</Switch>
	</React.Fragment>
  );
}

const mapStateToProps = ({currentUser, errors}) => ({
	currentUser,
	errors
});

export default withRouter(connect(mapStateToProps, {signupUser})(Main));