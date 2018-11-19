import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Navigator } from "./pages/Navigator";

Meteor.startup(() => {
	render(<Navigator/>, document.getElementById('root'));
});
