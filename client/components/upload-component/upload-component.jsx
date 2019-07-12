import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FileUploadAction } from "../../redux/file-upload/file-upload-action";
import { Button, Icon, Progress } from "antd";

class Component extends React.Component {

	render() {
		const meta = this.props.meta ? this.props.meta : "upload";
		return (
			<React.Fragment>
				<input
					id={"UploadComponent-" + meta}
					hidden={true}
					type="file"
					onChange={(e) => {
						const file = e.target.files[0];
						if (file) {
							this.props.dispatch(FileUploadAction.start(meta, file));
						}
					}}
				/>
				<Progress
					type="circle"
					percent={
						(() => {
							if (!this.props.FilesUploadReducer.files[meta]) {
								return 0;
							}
							return this.props.FilesUploadReducer.files[meta].progress;
						})()
					}
					status={
						(() => {
							if (!this.props.FilesUploadReducer.files[meta]) {
								return "active";
							}
							if (!this.props.FilesUploadReducer.files[meta].success) {
								return "exception";
							}
							if (this.props.FilesUploadReducer.files[meta].progress !== 100) {
								return "active";
							}
							return "success";
						})()
					}
					format={(percent) => {
						return (
							<Button
								size="small"
								disabled={(this.props.FilesUploadReducer.files[meta] && this.props.FilesUploadReducer.files[meta].success && this.props.FilesUploadReducer.files[meta].progress !== 100)}
								onClick={() => {
									$("#" + "UploadComponent-" + meta).click();
								}}
							>
								<Icon type="upload"/>
								{
									(() => {
										if (!this.props.FilesUploadReducer.files[meta]) {
											return "upload";
										}
										if (!this.props.FilesUploadReducer.files[meta].success) {
											return "retry";
										}
										if (this.props.FilesUploadReducer.files[meta].progress !== 100) {
											return percent + "%";
										}
										return "done";
									})()
								}
							</Button>
						);
					}}
				/>
			</React.Fragment>
		);
	}

}

Component.propTypes = {
	meta: PropTypes.string
};

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
})(Component);

export const UploadComponent = Redux;
