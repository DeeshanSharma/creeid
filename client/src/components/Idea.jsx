import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Thread from "./Thread";

function Idea(props) {
	function onDelete(id) {
		axios
			.delete(`/api/delete/${id}`)
			.then((res) => console.log(res.data.deleted))
			.catch((err) => console.log(err.response.data.notDeleted));
	}
	return (
		<>
			<h1>{props.idea.title}</h1>
			<span>{new Date(props.idea.date).toLocaleString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</span>
			<p>{props.idea.description}</p>
			{props.idea.thread.length !== 0 &&
				props.idea.thread.map((thread) => {
					return <Thread key={thread._id} thread={thread} ideaId={props.idea._id} />;
				})}
			<Link to={`/ideas/${props.idea._id}/thread/new`}>New Thread</Link>
			<Link to={`/update/${props.idea._id}`}>Update</Link>
			<button onClick={() => onDelete(props.idea._id)}>Delete</button>
		</>
	);
}

export default Idea;
