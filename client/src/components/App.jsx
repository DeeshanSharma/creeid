import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import Home from "./Home";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<ColorModeSwitcher />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</Router>
		</ChakraProvider>
	);
}

export default App;
