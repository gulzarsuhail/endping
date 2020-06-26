import React, { useState } from 'react';

export default function LoginForm({onSubmitHandler, errors, removeError, history}) {

	const [username, setUsername] = useState("");
	const [file, setFile] = useState(null);

	history.listen(() => {
		removeError();
	});

	const readTextFile = file => {

		return new Promise((resolve, reject) => {
			try {
				const fileReader = new FileReader();
				fileReader.onload = e => resolve (fileReader.result);
				fileReader.readAsText(file);
			} catch (err) {
				reject (err);
			}
		});
	  }

	const handleSubmit =  e => {
		e.preventDefault();
		readTextFile(file)
		.then(keyFile => onSubmitHandler({username, priKey: keyFile}))
		.then(() => history.push("/chats"))
		.catch(err => {return});
	}


	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
			<input type="file" name="file" accept=".pem"  onChange={(e)=>setFile(e.target.files[0])}/>
			<button type="submit">SUBMIT</button>
			{errors.message && (<div>{errors.message}</div>)}
		</form>
	)		
}