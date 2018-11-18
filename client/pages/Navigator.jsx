import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { IndexPage } from "./index-page/index-page";
import { store } from "../redux/store";

const history = createBrowserHistory();

export const Navigator = () => {
	return (
		<Provider
			store={store}
		>
			<Router
				history={history}
			>
				<Switch>
					<Route
						exact
						path='/'
						component={IndexPage}
					/>
				</Switch>
			</Router>
		</Provider>
	);
};
