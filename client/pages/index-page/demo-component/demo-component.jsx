import React from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Card, Icon, List, notification } from 'antd';
import { Files } from "/shared/collections/files";
import { FilesAction } from "../../../redux/actions/files-action";
import { LocaleAction } from "../../../redux/actions/locale-action";
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
						{this.props.strings['welcome']}
					</h1>
					<p>
						{this.props.strings['brief']}
					</p>
					<p
						style={styles.hyperlink}
					>
						<a
							href='https://github.com/pkcwong/meteor-react-starter'
						>
							<Icon
								type="github"
							/>
							{'\t' + this.props.strings['github']}
						</a>
					</p>
					<Card
						title={this.props.strings['bundled-packages']}
					>
						<List>
							<List.Item>
								{this.props.strings['meteor']}
							</List.Item>
							<List.Item>
								{this.props.strings['react-meteor-data']}
							</List.Item>
							<List.Item>
								{this.props.strings['antd']}
							</List.Item>
							<List.Item>
								{this.props.strings['redux']}
							</List.Item>
						</List>
					</Card>
					<Card
						title={this.props.strings['demo-documents']}
					>
						<List
							dataSource={this.props.Meteor.collection.users}
							renderItem={(item) => {
								return (
									<List.Item>
										{JSON.stringify(item)}
									</List.Item>
								)
							}}
						/>
					</Card>
					<Card
						title={this.props.strings['demo-files']}
					>
						<input
							hidden={true}
							type='file'
							onChange={(e) => {
								const file = e.target.files[0];
								this.props.dispatch(FilesAction.upload(file, (err, res) => {
									notification.open({
										message: 'Uploads',
										description: 'file ' + file.name + ' uploaded as ' + res._id
									});
								}));
							}}
						/>
						<Button
							type='primary'
							icon='upload'
							onClick={() => {
								$('input[type="file"]').click();
							}}
						>
							Upload File
						</Button>
						<List
							dataSource={this.props.Meteor.collection.files}
							renderItem={(item) => {
								return (
									<List.Item>
										<a
											href={Files.link(item)}
										>
											{item._id}
										</a>
										<Button
											type='danger'
											icon='delete'
											size='small'
											onClick={() => {
												this.props.dispatch(FilesAction.remove(item._id, () => {
													notification.open({
														message: 'Files',
														description: 'file ' + item._id + ' removed'
													});
												}));
											}}
										/>
									</List.Item>
								);
							}}
						/>
					</Card>
					<Card
						title={this.props.strings['demo-rest']}
					>
						<List.Item>
							<a
								href={'/api/meteor'}
							>
								{this.props.strings['version']}
							</a>
						</List.Item>
					</Card>
				</div>
			</React.Fragment>
		);
	}

	componentDidMount() {
		this.props.dispatch(LocaleAction.load('en', require('./locale-en.json')));
	}

}

const Tracker = withTracker(() => {
	Meteor.subscribe('users_db');
	Meteor.subscribe('files_db');
	return {
		Meteor: {
			collection: {
				users: Meteor.users.find().fetch(),
				files: Files.find().fetch()
			},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(Component);

export const DemoComponent = connect((store) => {
	return {
		logs: store['LoggerReducer']['logs'],
		strings: store['LocaleReducer']['strings']
	};
})(Tracker);
