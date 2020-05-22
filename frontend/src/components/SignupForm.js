import React, { useState } from 'react';

export default function LoginForm({onSubmitHandler}) {

	const [username, setUsername] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();
		onSubmitHandler(username).then(() => {
			console.log("LOGGED IN");
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Signup</h1>
			<input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
			<button type="submit">SIGNUP</button>
		</form>
	)		;
}