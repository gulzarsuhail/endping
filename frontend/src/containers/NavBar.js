import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../store/actions/auth';

const NavBar = ({currentUser, logoutUser}) => {


	const logout = (e) => {
		e.preventDefault();
		logoutUser();
	}

	return (
		<div>
			<Link to={'/'}>ENDPING</Link>
			{(currentUser.isAuthenticated)
				
				?
					<button onClick={logout}>LOGOUT</button>
				:
				(
					<React.Fragment>
						<Link to={'/login'}>SIGNIN</Link>
						<Link to={'/signup'}>SIGNUP</Link>
					</React.Fragment>
				)
			
			}

		</div>
	);
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps, {logoutUser})(NavBar);