import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { ChakraProvider, theme } from "@chakra-ui/react";
// import ColorModeSwitcher from "./ColorModeSwitcher";
import Home from "./Home";
import NewIdea from "./NewIdea";

function App() {
	return (
		// <ChakraProvider theme={theme}>
		// 	<ColorModeSwitcher />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/new" component={NewIdea} />
				</Switch>
			</Router>
		// </ChakraProvider>
	);
}

export default App;
