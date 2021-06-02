import React, { useState } from "react";
import axios from "axios";

function NewIdea(props) {
	const ideaStructure = {
		title: "",
		description: "",
	};

	const [ideas, setIdeas] = useState(ideaStructure);

	function onChange(event) {
		const { name, value } = event.target;

		setIdeas((prevValues) => {
			return {
				...prevValues,
				[name]: value,
			};
		});
	}

	function onSubmit(event) {
		event.preventDefault();
		const newIdea = {
			title: ideas.title,
			description: ideas.description,
		};

		axios
			.post("/api/new", newIdea)
			.then((res) => {
				console.log(res.data.created);
				setIdeas(ideaStructure);
				window.location.reload(true);
			})
			.catch((err) => console.log(err));
	}

	return (
		<form
			autoComplete="off"
			onSubmit={(event) => onSubmit(event)}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					props.setNewIdea(false);
					event.preventDefault();
					event.stopPropagation();
				}
			}}>
			<label htmlFor="title">Title: </label>
			<input type="text" autoFocus={true} name="title" value={ideas.title} onChange={(event) => onChange(event)} />
			<label htmlFor="description">Description: </label>
			<input type="text" name="description" value={ideas.description} onChange={(event) => onChange(event)} />
			<button type="submit">Submit</button>
		</form>
	);
}

export default NewIdea;
