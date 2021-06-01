import React from "react";
import axios from "axios";

function UpdateIdea(props) {
	const idea = props.idea;

	function onChange(event) {
		const { name, value } = event.target;

		props.setIdea((prevValues) => {
			return {
				...prevValues,
				[name]: value,
			};
		});
	}

	function onSubmit(event) {
		event.preventDefault();
		props.setToggleEdit(false);

		axios
			.patch(`/api/update/${idea._id}`, idea)
			.then((res) => {
				console.log(res.data.updated);
				window.location.reload(true);
			})
			.catch((err) => console.log(err));
	}

	return (
		<form autoComplete="off" onSubmit={(event) => onSubmit(event)} onKeyDown={(event) => props.exitEdit(event, props.setToggleEdit)}>
			<label htmlFor="title">Title:</label>
			<input type="text" autoFocus={true} name="title" value={idea.title} onChange={(event) => onChange(event)} />
			<label htmlFor="description">Description:</label>
			<textarea name="description" rows="5" cols="50" value={idea.description} onChange={(event) => onChange(event)} />
			<button type="submit">Update</button>
		</form>
	);
}

export default UpdateIdea;
