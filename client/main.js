import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import { Navigator } from "./pages/navigator";

const App = () => {
	return (
		<Provider
			store={store}
		>
			<Navigator/>
		</Provider>
	)
};

Meteor.startup(() => {
	render(<App/>, document.getElementById('root'));
});
