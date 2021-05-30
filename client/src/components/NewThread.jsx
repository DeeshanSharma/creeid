import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function NewThread(props) {
	const threadStructure = {
		text: "",
	};

	const [thread, setThread] = useState(threadStructure);

	function onChange(event) {
		const { name, value } = event.target;

		setThread({
			[name]: value,
		});
	}

	function onSubmit(event) {
		event.preventDefault();
		const newThread = {
			text: thread.text,
		};

		axios
			.patch(`/api/ideas/${props.match.params.id}/thread/new`, newThread)
			.then((res) => {
				console.log(res.data.created);
				setThread(threadStructure);
				props.history.push("/");
			})
			.catch((err) => console.log(err.response.data.notCreated));
	}

	return (
		<>
			<form autoComplete="off" onSubmit={(event) => onSubmit(event)}>
				<label htmlFor="text">Text: </label>
				<input type="text" name="text" value={thread.text} onChange={(event) => onChange(event)} />
				<button type="submit">Submit</button>
			</form>
			<Link to="/">Go Back</Link>
		</>
	);
}

export default NewThread;
