import React, { useState } from "react";
import axios from "axios";

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
			.patch(`/api/ideas/${props.ideaId}/thread/new`, newThread)
			.then((res) => {
				console.log(res.data.created);
				setThread(threadStructure);
				window.location.reload(true);
			})
			.catch((err) => console.log(err.response.data.notCreated));
	}

	return (
		<form autoComplete="off" onSubmit={(event) => onSubmit(event)} onKeyDown={(event) => props.exitEdit(event, props.setAddThread)}>
			<label htmlFor="text">Text: </label>
			<input type="text" autoFocus={true} name="text" value={thread.text} onChange={(event) => onChange(event)} />
			<button type="submit">Add</button>
		</form>
	);
}

export default NewThread;
