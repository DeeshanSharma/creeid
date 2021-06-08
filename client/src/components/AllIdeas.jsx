import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Idea from "./Idea";
import NewIdea from "./NewIdea";
import ShowAlert from "./ShowAlert";

export const AlertContext = React.createContext(null);

function Home() {
	const [ideas, setIdeas] = useState([]);
	const [newIdea, setNewIdea] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		const source = axios.CancelToken.source();
		axios
			.get("/api/ideas", { cancelToken: source.token })
			.then((res) => setIdeas(res.data))
			.catch((err) => {
				if (axios.isCancel(err)) return;
				if (err.response.status === 404) {
					setAlertMsg(err.response.data.nothingFound);
					return;
				}
				if (err.response.status === 400) {
					setAlertMsg(err.response.data.error);
					return;
				}
				console.log(err);
			});

		return () => {
			source.cancel();
		};
	}, [alertMsg, update]);

	return (
		<AlertContext.Provider value={{ setAlertMsg, setUpdate }}>
			<Header />
			{alertMsg !== "" && alertMsg !== null && <ShowAlert alertMsg={alertMsg} />}
			<h1>All Ideas</h1>
			{!newIdea ? <button onClick={() => setNewIdea(true)}>Got New Idea</button> : <NewIdea setNewIdea={setNewIdea} />}
			{ideas.length === 0 ? (
				<h1>{alertMsg}</h1>
			) : update ? (
				ideas.map((idea, index) => {
					return <Idea key={index} idea={idea} />;
				})
			) : (
				ideas.map((idea, index) => {
					return <Idea key={index} idea={idea} />;
				})
			)}
		</AlertContext.Provider>
	);
}

export default Home;
