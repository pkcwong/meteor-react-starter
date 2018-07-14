import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { connect } from 'react-redux';
import { store } from "../../store";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.Meteor);
		return (
			<p>
				{this.props.server.release}
			</p>
		);
	}

	componentDidMount() {
		store.dispatch({
			type: 'Meteor/RELEASE-FETCH'
		});
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
	return {
		server: {
			release: store['MeteorReducer']['release']
		}
	};
})(Tracker);
