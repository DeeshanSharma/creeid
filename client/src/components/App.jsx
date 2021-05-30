import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { ChakraProvider, theme } from "@chakra-ui/react";
// import ColorModeSwitcher from "./ColorModeSwitcher";
import Home from "./Home";
import NewIdea from "./NewIdea";
import UpdateIdea from "./UpdateIdea";

function App() {
	return (
		// <ChakraProvider theme={theme}>
		// 	<ColorModeSwitcher />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/new" component={NewIdea} />
					<Route path="/update/:id" component={UpdateIdea} />
				</Switch>
			</Router>
		// </ChakraProvider>
	);
}

export default App;
