import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { connect } from 'react-redux';

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div/>
		);
	}

}

const Tracker = withTracker(() => {
	return {
		Meteor: {
			collection: {},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(Component);

export const IndexPage = connect((store) => {
	return {};
})(Tracker);
