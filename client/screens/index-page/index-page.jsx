import React from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Glyphicon, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { CounterAction } from "../../redux/actions/counter-action";
import { styles } from "./styles";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div
					style={styles.page}
				>
					<h1>
						Welcome to Meteor!
					</h1>
					<p>
						A starter repo to building a web application with ReactJS, using the MeteorJS framework.
					</p>
					<Panel
						bsStyle="primary"
					>
						<Panel.Heading>
							Bundled Packages
						</Panel.Heading>
						<Panel.Body>
							<div
								style={styles.hyperlink}
							>
								<a
									href='https://github.com/pkcwong/meteor-react-starter'
								>
									{'GitHub Repository\t'}
									<Glyphicon
										glyph='new-window'
									/>
								</a>
							</div>
							<p>
								List of used libraries and frameworks.
							</p>
							<ListGroupItem>
								MeteorJS
							</ListGroupItem>
							<ListGroupItem>
								react-meteor-data for MeteorJS reactivity
							</ListGroupItem>
							<ListGroupItem>
								Restivus for HTTP Rest API
							</ListGroupItem>
							<ListGroupItem>
								React-Bootstrap targeting Bootstrap v3
							</ListGroupItem>
							<ListGroupItem>
								Redux with Redux Saga
							</ListGroupItem>
						</Panel.Body>
					</Panel>
					<Panel
						bsStyle="success"
					>
						<Panel.Heading>
							Redux Action Dispatch
						</Panel.Heading>
						<Panel.Body>
							<p>
								Demonstration of Redux store, reducer, and actions.
							</p>
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
									this.props.logs.map((item, index) => {
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
						</Panel.Body>
					</Panel>
					<Panel
						bsStyle="success"
					>
						<Panel.Heading>
							Meteor Users Collection
						</Panel.Heading>
						<Panel.Body>
							<p>
								Demonstration of fetching documents from MongoDB.
							</p>
							<ListGroup>
								{
									this.props.Meteor.collection.users.map((item, index) => {
										return (
											<React.Fragment
												key={index}
											>
												<ListGroupItem>
													{JSON.stringify(item)}
												</ListGroupItem>
											</React.Fragment>
										)
									})
								}
							</ListGroup>
						</Panel.Body>
					</Panel>
					<Panel
						bsStyle="success"
					>
						<Panel.Heading>
							HTTP Rest API
						</Panel.Heading>
						<Panel.Body>
							<p>
								Demonstration of Rest API.
							</p>
							<ListGroup>
								<ListGroupItem
									onClick={() => {
										window.location = '/api/meteor'
									}}
								>
									<Glyphicon
										glyph='send'
									/>
									{'\tMeteor Version'}
								</ListGroupItem>
							</ListGroup>
						</Panel.Body>
					</Panel>
				</div>
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
	Meteor.subscribe('users_db');
	return {
		Meteor: {
			collection: {
				users: Meteor.users.find().fetch()
			},
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
