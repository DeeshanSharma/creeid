import React, { useState } from "react";
import axios from "axios";
import UpdateIdea from "./UpdateIdea";
import Thread from "./Thread";
import NewThread from "./NewThread";

function Idea(props) {
	const [idea, setIdea] = useState(props.idea);
	const [toggleEdit, setToggleEdit] = useState(false);
	const [addThread, setAddThread] = useState(false);

	function onDelete(id) {
		axios
			.delete(`/api/delete/${id}`)
			.then((res) => {
				console.log(res.data.deleted);
				window.location.reload(true);
			})
			.catch((err) => console.log(err.response.data.notDeleted));
	}

	function exitEdit(event, exitHandleFunction) {
		if (event.key === "Escape") {
			exitHandleFunction(false);
			event.preventDefault();
			event.stopPropagation();
			window.location.reload(true);
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
			{idea.thread.length !== 0 &&
				idea.thread.map((thread, index) => {
					return <Thread key={index} thread={thread} ideaId={idea._id} />;
				})}
			{!addThread ? <button onClick={() => setAddThread(true)}>New Thread</button> : <NewThread ideaId={idea._id} exitEdit={exitEdit} setAddThread={setAddThread} />}
			<button onClick={() => onDelete(idea._id)}>Delete</button>
		</>
	);
}

export default Idea;
