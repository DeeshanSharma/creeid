import React, { useState, useContext } from "react";
import axios from "axios";
import UpdateIdea from "./UpdateIdea";
import { AlertContext } from "./Home";

function Idea(props) {
	const [idea, setIdea] = useState(props.idea);
	const [toggleEdit, setToggleEdit] = useState(false);
	const { setAlertMsg, setUpdate } = useContext(AlertContext);

	function onDelete(id) {
		axios
			.delete(`/api/delete/${id}`)
			.then((res) => {
				setAlertMsg(res.data.deleted);
				setUpdate((prev) => !prev);
			})
			.catch((err) => {
				if (err.response.status === 400) {
					setAlertMsg(err.response.data.notDeleted);
					return;
				}
				console.log(err);
			});
	}

	function exitEdit(event, exitHandleFunction) {
		if (event.key === "Escape") {
			exitHandleFunction(false);
			event.preventDefault();
			event.stopPropagation();
		}
	}

	return (
		<>
			{!toggleEdit ? (
				<div onDoubleClick={() => setToggleEdit(true)}>
					<h1>{idea.title}</h1>
					<span>{new Date(idea.date).toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</span>
					<p>{idea.description}</p>
				</div>
			) : (
				<UpdateIdea idea={idea} setIdea={setIdea} exitEdit={exitEdit} setToggleEdit={setToggleEdit} />
			)}
			<button onClick={() => onDelete(idea._id)}>Delete</button>
		</>
	);
}

export default Idea;
