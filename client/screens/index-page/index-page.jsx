import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { connect } from 'react-redux';
import { store } from "../../redux/store";
import { CounterAction } from "../../redux/actions/counter-action";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<h1>
					Welcome to Meteor!
				</h1>
				<p>
					<button
						onClick={this._handleCounterClick}
					>
						Click Me
					</button>
					<button
						onClick={this._handleCounterReset}
					>
						Reset
					</button>
				</p>
				<p>
					You've pressed the button {this.props.counter} times.
				</p>
			</React.Fragment>
		);
	}

	_handleCounterClick = () => {
		store.dispatch(CounterAction.increment());
	};

	_handleCounterReset = () => {
		store.dispatch(CounterAction.reset());
	};

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
		counter: store['CounterReducer']['counter']
	};
})(Tracker);
