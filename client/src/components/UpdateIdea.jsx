import React, { useContext } from "react";
import axios from "axios";
import { AlertContext } from "./Home";

function UpdateIdea(props) {
	const { setAlertMsg, setUpdate } = useContext(AlertContext);
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

		axios
			.patch(`/api/update/${idea._id}`, idea)
			.then((res) => {
				setAlertMsg(res.data.updated);
				setUpdate((prev) => !prev);
				props.setToggleEdit(false);
			})
			.catch((err) => {
				if (err.response.status === 400) {
					setAlertMsg(err.response.data.notUpdated);
					return;
				}
				console.log(err);
			});
	}

	return (
		<form autoComplete="off" onSubmit={(event) => onSubmit(event)} onKeyDown={(event) => props.exitEdit(event, props.setToggleEdit)}>
			<label htmlFor="title">Title:</label>
			<input type="text" autoFocus={true} name="title" value={idea.title} onChange={(event) => onChange(event)} required />
			<label htmlFor="description">Description:</label>
			<input type="text" name="description" rows="5" cols="50" value={idea.description} onChange={(event) => onChange(event)} />
			<button type="submit">Update</button>
		</form>
	);
}

export default UpdateIdea;
