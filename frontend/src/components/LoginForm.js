import React, { useState } from 'react';

export default function LoginForm() {

	const [username, setUsername] = useState("");
	const [file, setFile] = useState(null);


	const readTextFile = async file => {
		const resultText = await new Promise((resolve) => {
			const fileReader = new FileReader();
        	fileReader.onload = (e) => resolve(fileReader);
        	fileReader.readAsText(file);
		});
		return resultText.result;
	  }

	const handleSubmit = async e => {
		e.preventDefault();
		const keyfileContent = await readTextFile(file);
		console.log(username)
		console.log(keyfileContent)
	}


	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
			<input type="file" name="file" accept=".pem"  onChange={(e)=>setFile(e.target.files[0])}/>
			<button type="submit">SUBMIT</button>
		</form>
	)		
}