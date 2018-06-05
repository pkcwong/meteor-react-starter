import React from 'react';
import { Button, Card, Dimmer, Image } from 'semantic-ui-react';
import { Files } from "/shared/collections/files";

/**
 * props: {file_id_s, onUpload, onRemove}
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
												this.setState({
													target: item
												});
											}}
										/>
									);
								})
							}
						</Image.Group>
						<Button
							icon="settings"
							circular
							onClick={() => {
								$(".ui.modal").modal("show");
							}}
						/>
					</Card.Content>
				</Card>
				<div
					className="ui modal"
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
								console.log(file);
								if (file) {
									file.remove();
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
										$("input[type='file']").click();
									}}
								>
									<i
										className="cloud icon"
									/>
									upload
								</Button>
							</p>
							<input
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
									$("input[type='file']").val("");
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
													this.setState({
														target: item
													});
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

	componentDidUpdate() {
		if (this.state.target === null && this.props.file_id_s.length !== 0) {
			this.setState({
				target: this.props.file_id_s[0]
			});
		}
	}

}
