import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Idea from "./Idea";

function Home() {
	const [ideas, setIdeas] = useState([]);

	useEffect(() => {
		const source = axios.CancelToken.source();
		axios
			.get("/api/ideas", { cancelToken: source.token })
			.then((res) => setIdeas(res.data))
			.catch((err) => {
				if (axios.isCancel(err)) return;
				console.log(err.response.data.nothingFound);
			});

		return () => {
			source.cancel();
		};
	}, []);

	return (
		<>
			<h1>All Ideas</h1>
			<Link to="/new">New Idea</Link>
			{ideas.map((idea) => {
				return <Idea key={idea._id} idea={idea} />;
			})}
		</>
	);
}

export default Home;
