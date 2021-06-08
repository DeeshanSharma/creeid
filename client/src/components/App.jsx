import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Home from "./Home";
import AllIdeas from "./AllIdeas";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/ideas" component={AllIdeas} />
				</Switch>
			</Router>
		</ChakraProvider>
	);
}

export default App;
