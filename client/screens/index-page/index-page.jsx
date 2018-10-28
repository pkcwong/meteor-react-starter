import React from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Glyphicon, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { styles } from "./styles";
import { LocaleAction } from "../../redux/actions/locale-action";

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
						{this.props.strings['welcome']}
					</h1>
					<p>
						{this.props.strings['brief']}
					</p>
					<Panel
						bsStyle="primary"
					>
						<Panel.Heading>
							{this.props.strings['bundled-packages']}
						</Panel.Heading>
						<Panel.Body>
							<div
								style={styles.hyperlink}
							>
								<a
									href='https://github.com/pkcwong/meteor-react-starter'
								>
									{this.props.strings['github'] + '\t'}
									<Glyphicon
										glyph='new-window'
									/>
								</a>
							</div>
							<p>
								{this.props.strings['list-libraries']}
							</p>
							<ListGroupItem>
								{this.props.strings['meteor']}
							</ListGroupItem>
							<ListGroupItem>
								{this.props.strings['react-meteor-data']}
							</ListGroupItem>
							<ListGroupItem>
								{this.props.strings['restivus']}
							</ListGroupItem>
							<ListGroupItem>
								{this.props.strings['bootstrap']}
							</ListGroupItem>
							<ListGroupItem>
								{this.props.strings['redux']}
							</ListGroupItem>
						</Panel.Body>
					</Panel>
					<Panel
						bsStyle="success"
					>
						<Panel.Heading>
							{this.props.strings['users-collection']}
						</Panel.Heading>
						<Panel.Body>
							<p>
								{this.props.strings['demo-documents']}
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
							{this.props.strings['http-rest']}
						</Panel.Heading>
						<Panel.Body>
							<p>
								{this.props.strings['demo-rest']}
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
									{'\t' + this.props.strings['version']}
								</ListGroupItem>
							</ListGroup>
						</Panel.Body>
					</Panel>
				</div>
			</React.Fragment>
		);
	}

	componentDidMount() {
		this.props.dispatch(LocaleAction.set('en'));
	}

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
		strings: store['LocaleReducer']['strings']
	};
})(Tracker);
