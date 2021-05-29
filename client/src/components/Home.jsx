import React, { useState, useEffect } from "react";
import axios from "axios";
import Idea from "./Idea";

function Home() {
	const [ideas, setIdeas] = useState([]);

	useEffect(() => {
		axios
			.get("/api/ideas")
			.then((res) => setIdeas(res.data))
			.catch((err) => console.log(err.response.data.error));
	}, []);

	return (
		<>
			<h1>All Ideas</h1>
			{ideas.map((idea) => {
				return <Idea key={idea._id} idea={idea} />;
			})}
		</>
	);
}

export default Home;
