import React, { useState } from 'react';

export default function SignupForm({onSubmitHandler, errors, removeError, history}) {

	const [username, setUsername] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();
		onSubmitHandler(username)
		.then(() => history.push("/"))
		.catch(err => {return});
	}

	history.listen(() => {
		removeError();
	});

	return (
		<form onSubmit={handleSubmit}>
			<h1>Signup</h1>
			<input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
			<button type="submit">SIGNUP</button>
			{errors.message && (<div>{errors.message}</div>)}
		</form>
	);
}