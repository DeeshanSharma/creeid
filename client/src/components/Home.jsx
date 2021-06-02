import React, { useState, useEffect } from "react";
import axios from "axios";
import Idea from "./Idea";
import NewIdea from "./NewIdea";

function Home() {
	const [ideas, setIdeas] = useState([]);
	const [newIdea, setNewIdea] = useState(false);

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
			{!newIdea ? <button onClick={() => setNewIdea(true)}>Got New Idea</button> : <NewIdea setNewIdea={setNewIdea} />}
			{ideas.map((idea) => {
				return <Idea key={idea._id} idea={idea} />;
			})}
		</>
	);
}

export default Home;
