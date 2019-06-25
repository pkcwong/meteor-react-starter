import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { IndexPage } from "./index-page/index-page";

const history = createBrowserHistory();

export const Navigator = () => {
	return (
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
	);
};
