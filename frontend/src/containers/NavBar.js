import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = () => {
	return (
		<div>
			<Link to={'/'}>ENDPING</Link>
			<Link to={'/login'}>SIGNIN</Link>
			<Link to={'/signup'}>SIGNUP</Link>
		</div>
	);
}

const mapStateToProps = ({currentUser}) => currentUser;

export default connect(mapStateToProps, null)(NavBar);