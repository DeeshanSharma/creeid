import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateIdea(props) {
	const ideaStructure = {
		title: "",
		date: "",
		description: "",
		thread: [],
	};

	const [idea, setIdea] = useState(ideaStructure);

	useEffect(() => {
		axios
			.get(`/api/ideas/${props.match.params.id}`)
			.then((res) => setIdea(res.data))
			.catch((err) => console.log(err.response.data.nothingFound));
		return () => {};
	}, [props]);

	function onChange(event) {
		const { name, value } = event.target;

		setIdea((prevValues) => {
			return {
				...prevValues,
				[name]: value,
			};
		});
	}

	function onSubmit(event) {
		event.preventDefault();
		const newIdea = {
			title: idea.title,
			description: idea.description,
		};

		axios
			.patch(`/api/update/${props.match.params.id}`, newIdea)
			.then((res) => {
				console.log(res.data.updated);
				props.history.push("/");
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<form onSubmit={(event) => onSubmit(event)}>
				<label htmlFor="title">Title:</label>
				<input type="text" name="title" value={idea.title} onChange={(event) => onChange(event)} />
				<label htmlFor="description">Description:</label>
				<textarea name="description" rows="5" cols="50" value={idea.description} onChange={(event) => onChange(event)} />
				<button type="submit">Update</button>
			</form>
		</>
	);
}

export default UpdateIdea;
