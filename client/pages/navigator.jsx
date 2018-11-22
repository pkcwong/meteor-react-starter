import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { IndexPage } from "./index-page/index-page";
import "antd/dist/antd.css";

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
