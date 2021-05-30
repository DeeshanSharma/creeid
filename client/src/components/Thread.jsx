import React from "react";
import axios from "axios";

function Thread(props) {
	function onDelete(id) {
		axios
			.patch(`/api/ideas/${props.ideaId}/thread/delete/${id}`)
			.then((res) => console.log(res.data.deleted)
			)
			.catch((err) => console.log(err.response.data.notDeleted));
	}

	return (
		<p>
			{props.thread.text}
			<button onClick={() => onDelete(props.thread._id)}>Remove</button>
		</p>
	);
}

export default Thread;
