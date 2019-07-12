import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Button, Card, Icon, Input, Table, Typography } from "antd";
import "antd/dist/antd.css";
import { styles } from "./styles";
import { Files } from "../../../shared/collections/files";
import { UploadComponent } from "../../components/upload-component/upload-component";
import { FileRemoveAction } from "../../redux/file-remove/file-remove-action";
import { AuthAction } from "../../redux/auth/auth-action";

class Component extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}

	render() {
		return (
			<React.Fragment>
				<div style={styles.header}>
					<Typography.Title level={2}>
						Welcome to Meteor!
						{"\t"}
						<a href="https://circleci.com/gh/pkcwong/meteor-react-starter/tree/master">
							<img
								src="https://circleci.com/gh/pkcwong/meteor-react-starter.svg?style=shield"
								alt="circle-ci"
							/>
						</a>
					</Typography.Title>
					<a href="https://github.com/pkcwong/meteor-react-starter">
						<Button type="primary" shape="round" icon="github">
							Github Project
						</Button>
					</a>
				</div>
				<Card style={styles.container} title="Authentication Demo">
					<Card.Meta description="Username and password authentication (username: root) (password: root)"/>
					<div style={styles.container}>
						<div style={styles.halfContainer}>
							{
								(() => {
									if (this.props.Meteor.user) {
										return (
											<React.Fragment>
												<Button
													onClick={() => {
														this.props.dispatch(AuthAction.logout());
													}}
												>
													Logout
												</Button>
											</React.Fragment>
										);
									}
									return (
										<React.Fragment>
											<Input
												prefix={(
													<Icon type="user"/>
												)}
												placeholder="username"
												value={this.state.username}
												onChange={(e) => {
													this.setState({
														username: e.target.value
													});
												}}
											/>
											<Input
												prefix={(
													<Icon type="lock"/>
												)}
												type="password"
												placeholder="Password"
												value={this.state.password}
												onChange={(e) => {
													this.setState({
														password: e.target.value
													});
												}}
											/>
											<Button
												onClick={() => {
													this.props.dispatch(AuthAction.login(this.state.username, this.state.password));
												}}
											>
												Login
											</Button>
										</React.Fragment>
									)
								})()
							}
						</div>
						<div style={styles.halfContainer}>
							{
								(() => {
									if (this.props.Meteor.user) {
										return (
											<React.Fragment>
												<p>
													_id: {this.props.Meteor.userId}
												</p>
												<p>
													Username: {this.props.Meteor.user.username}
												</p>
												<p>
													Name: {this.props.Meteor.user.profile.name}
												</p>
											</React.Fragment>
										);
									}
									return (
										<p>
											You are not logged in.
										</p>
									);
								})()
							}
						</div>
					</div>
				</Card>
				<Card style={styles.container} title="Upload Demo">
					<Card.Meta description="Upload files with progress feedback, files are stored in MongoDB GridFS."/>
					<div style={styles.container}>
						<div style={styles.halfContainer}>
							<UploadComponent meta="testingUpload"/>
						</div>
						<div style={styles.halfContainer}>
							<Table
								rowKey="_id"
								dataSource={this.props.Meteor.collection.files}
								columns={[
									{
										title: "File",
										dataIndex: "_id",
										render: (text, record) => {
											return (
												<React.Fragment>
													<a href={record.link}>
														{record._id + "." + record.extension}
													</a>
												</React.Fragment>
											);
										}
									},
									{
										title: "Size (bytes)",
										dataIndex: "size",
									},
									{
										title: "Action",
										render: (text, record) => {
											return (
												<React.Fragment>
													<Button
														type="danger"
														icon="delete"
														size="small"
														onClick={() => {
															this.props.dispatch(FileRemoveAction.start(record._id));
														}}
													/>
												</React.Fragment>
											);
										}
									}
								]}
							/>
						</div>
					</div>
				</Card>
			</React.Fragment>
		);
	}

}

const Tracker = withTracker(() => {
	Meteor.subscribe("users_db");
	Meteor.subscribe("files_db");
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

const Redux = connect((store) => {
	return {
		AuthReducer: {
			status: store.AuthReducer.status,
			message: store.AuthReducer.message
		},
		FilesUploadReducer: {
			files: store.FileUploadReducer.files
		}
	};
})(Tracker);

export const IndexPage = Redux;
