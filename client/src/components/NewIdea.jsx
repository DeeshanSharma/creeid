import React, { useState, useContext } from "react";
import axios from "axios";
import { AlertContext } from "./Home";

function NewIdea(props) {
	const { setAlertMsg, setUpdate } = useContext(AlertContext);
	const ideaStructure = {
		title: "",
		description: "",
	};

	const [idea, setIdea] = useState(ideaStructure);

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
			.post("/api/new", newIdea)
			.then((res) => {
				setIdea(ideaStructure);
				setAlertMsg(res.data.created);
				setUpdate((prev) => !prev);
				props.setNewIdea(false);
			})
			.catch((err) => {
				if (err.response.status === 400) {
					setAlertMsg(err.response.data.notCreated);
					return;
				}
				console.log(err);
			});
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
			<input type="text" autoFocus={true} name="title" value={idea.title} onChange={(event) => onChange(event)} required />
			<label htmlFor="description">Description: </label>
			<input type="text" name="description" value={idea.description} onChange={(event) => onChange(event)} />
			<button type="submit">Submit</button>
		</form>
	);
}

export default NewIdea;
