import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Thread from "./Thread";

function Idea(props) {
	const [idea, setIdea] = useState(props.idea);
	const [toggleEdit, setToggleEdit] = useState(false);

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
		setToggleEdit(false);

		axios
			.patch(`/api/update/${idea._id}`, idea)
			.then((res) => {
				console.log(res.data.updated);
			})
			.catch((err) => console.log(err));
	}

	function onDelete(id) {
		axios
			.delete(`/api/delete/${id}`)
			.then((res) => {
				console.log(res.data.deleted);
				window.location.reload(true);
			})
			.catch((err) => console.log(err.response.data.notDeleted));
	}

	return (
		<>
			{!toggleEdit ? (
				<div onDoubleClick={() => setToggleEdit(true)}>
					<h1>{idea.title}</h1>
					<span>{new Date(idea.date).toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</span>
					<p>{idea.description}</p>
					{idea.thread.length !== 0 &&
						idea.thread.map((thread) => {
							return <Thread key={thread._id} thread={thread} ideaId={idea._id} />;
						})}
					<Link to={`/ideas/${idea._id}/thread/new`}>New Thread</Link>
					<button onClick={() => onDelete(idea._id)}>Delete</button>
				</div>
			) : (
				<form
					autoComplete="off"
					onSubmit={(event) => onSubmit(event)}
					onKeyDown={(event) => {
						if (event.key === "Escape") {
							setToggleEdit(false);
							event.preventDefault();
							event.stopPropagation();
						}
					}}>
					<label htmlFor="title">Title:</label>
					<input type="text" autoFocus={true} name="title" value={idea.title} onChange={(event) => onChange(event)} />
					<label htmlFor="description">Description:</label>
					<textarea name="description" rows="5" cols="50" value={idea.description} onChange={(event) => onChange(event)} />
					<button type="submit">Update</button>
				</form>
			)}
		</>
	);
}

export default Idea;
