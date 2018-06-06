import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Files } from "/shared/collections/files";

/**
 * props: {file_id_s, onUpload, onRemove, onTargetChange, sudo, onMount}
 */
export class FilesComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			target: null
		}
	}

	render() {
		return (
			<div>
				<Card>
					{
						(() => {
							let link = "/res/img/generic-image.png";
							let target = Files.findOne({
								_id: this.state.target
							});
							if (target) {
								link = target.link();
								if (!target['isImage']) {
									link = "/res/img/generic-file.png";
								}
							}
							return (
								<Image
									src={link}
								/>
							);
						})()
					}
					<Card.Content
						extra
					>
						<Image.Group
							size="mini"
						>
							{
								this.props.file_id_s.map((item) => {
									let link = "/res/img/generic-image.png";
									let file = Files.findOne({
										_id: item
									});
									if (file) {
										link = file.link();
										if (!file['isImage']) {
											link = "/res/img/generic-file.png";
										}
									}
									return (
										<Image
											key={item}
											src={link}
											circular
											onClick={() => {
												this.setTarget(item);
											}}
										/>
									);
								})
							}
						</Image.Group>
						{
							(() => {
								if (this.props.sudo) {
									return (
										<Button
											icon="settings"
											circular
											onClick={() => {
												$("#files-component-modal").modal("show");
											}}
										/>
									)
								} else {
									return null;
								}
							})()
						}
					</Card.Content>
				</Card>
				<div
					className="ui modal"
					id="files-component-modal"
				>
					<div
						className="header"
					>
						Files
					</div>
					<div
						className="image content"
					>
						<div
							className="ui medium image"
						>
							{
								(() => {
									let link = "/res/img/generic-image.png";
									let target = Files.findOne({
										_id: this.state.target
									});
									if (target) {
										link = target.link();
										if (!target['isImage']) {
											link = "/res/img/generic-file.png";
										}
									}
									return (
										<Image
											src={link}
										/>
									);
								})()
							}
						</div>
						<Button
							onClick={() => {
								let file = Files.findOne({
									_id: this.state.target
								});
								if (file) {
									file.remove();
									this.props.onRemove(file);
								}
							}}
						>
							remove file
						</Button>
						<div
							className="description"
						>
							<div
								className="ui header"
							>
								Manage files.
							</div>
							<p>
								<Button
									className="ui labeled icon button"
									onClick={() => {
										$("#files-component-file-input").click();
									}}
								>
									<i
										className="cloud icon"
									/>
									upload
								</Button>
							</p>
							<input
								id="files-component-file-input"
								type="file"
								hidden
								onChange={(e) => {
									let file = e.target.files[0];
									if (file) {
										let upload = Files.insert({
											file: file,
											streams: 'dynamic',
											chunkSize: 'dynamic'
										}, false);
										upload.on('end', (err, file) => {
											if (err) {
												console.error(err);
											} else {
												this.props.onUpload(file);
											}
										});
										upload.start();
									}
									$("#files-component-file-input").val("");
								}}
							/>
							<Image.Group
								size="tiny"
							>
								{
									this.props.file_id_s.map((item) => {
										let link = "/res/img/generic-image.png";
										let file = Files.findOne({
											_id: item
										});
										if (file) {
											link = file.link();
											if (!file['isImage']) {
												link = "/res/img/generic-file.png";
											}
										}
										return (
											<Image
												key={item}
												className="ui tiny image"
												src={link}
												onClick={() => {
													this.setTarget(item);
												}}
											/>
										);
									})
								}
							</Image.Group>
						</div>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		if (this.props.onMount) {
			this.props.onMount({
				setTarget: (file_id) => {
					this.setTarget(file_id);
				}
			});
		}
	}

	componentDidUpdate() {
		if (this.state.target === null && this.props.file_id_s.length !== 0) {
			this.setTarget(this.props.file_id_s[0]);
		}
	}

	setTarget(file_id) {
		this.setState({
			target: file_id
		});
		this.props.onTargetChange(file_id);
	}

}
