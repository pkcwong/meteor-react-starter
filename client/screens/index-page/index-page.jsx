import React from 'react';
import { connect } from 'react-redux';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import { CounterAction } from "../../redux/actions/counter-action";
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

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
					<Button
						onClick={this._handleCounterClick}
					>
						Click Me
					</Button>
					<Button
						onClick={this._handleCounterReset}
					>
						Reset
					</Button>
				</p>
				<p>
					You've pressed the button {this.props.counter} times.
				</p>
				<ListGroup>
					{
						this.props.logs.reverse().map((item, index) => {
							return (
								<React.Fragment
									key={index}
								>
									<ListGroupItem>
										{JSON.stringify(item)}
									</ListGroupItem>
								</React.Fragment>
							);
						})
					}
				</ListGroup>
			</React.Fragment>
		);
	}

	_handleCounterClick = () => {
		this.props.store.dispatch(CounterAction.increment());
	};

	_handleCounterReset = () => {
		this.props.store.dispatch(CounterAction.reset());
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
		logs: store['LoggerReducer']['logs'],
		counter: store['CounterReducer']['counter']
	};
})(Tracker);
