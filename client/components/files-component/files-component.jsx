import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Icon, Image, Modal, Segment } from 'semantic-ui-react';
import "./style.css";

export class FilesComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			target: null
		};
	}

	render() {
		return (
			<Modal
				open={this.props.visible}
				style={{
					marginTop: '0px !important',
					marginLeft: 'auto',
					marginRight: 'auto'
				}}
			>
				<Modal.Header>
					File Picker
				</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Grid>
							<Grid.Column
								width={6}
							>
								{
									(() => {
										let src = "/res/img/generic-file.png";
										if (this.state.target && this.state.target['isImage']) {
											src = this.state.target.link();
										}
										return (
											<Image
												wrapped
												size="medium"
												src={src}
											/>
										);
									})()
								}
							</Grid.Column>
							<Grid.Column
								width={10}
							>
								<Grid>
									<Grid.Row>
										<Grid.Column>
											<Segment
												textAlign="right"
											>
												<Image.Group
													size="tiny"
												>
													{
														this.props.files.map((item, index) => {
															if (item['isImage']) {
																return (
																	<Image
																		key={index}
																		bordered
																		src={item.link()}
																		size="tiny"
																		onClick={() => {
																			this.setState({
																				target: item
																			});
																		}}
																	/>
																)
															} else {
																return (
																	<Image
																		key={index}
																		bordered
																		src="/res/img/generic-file.png"
																		size="tiny"
																		onClick={() => {
																			this.setState({
																				target: item
																			});
																		}}
																	/>
																);
															}
														})
													}
												</Image.Group>
												{
													(() => {
														if (this.props.onUpload) {
															return (
																<React.Fragment>
																	<Button
																		circular
																		icon="plus square"
																		onClick={() => {
																			$(this.refs.input).click();
																		}}
																	/>
																	<input
																		ref="input"
																		type="file"
																		hidden
																		onChange={(e) => {
																			let files = e.target.files;
																			if (files[0]) {
																				this.props.onUpload(files[0]);
																				$(e.target).val("");
																			}
																		}}
																	/>
																</React.Fragment>
															);
														}
													})()
												}
											</Segment>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column>
											{
												(() => {
													if (this.state.target) {
														return (
															<React.Fragment>
																<p>
																	filename: {this.state.target['name']}
																</p>
																<p>
																	size: {this.state.target['size']} bytes
																</p>
																{
																	(() => {
																		if (this.props.onRemove) {
																			return (
																				<Button
																					negative
																					icon
																					onClick={() => {
																						this.props.onRemove(this.state.target);
																						this.setState({
																							target: null
																						});
																					}}
																				>
																					Delete
																					<Icon
																						name="trash"
																					/>
																				</Button>
																			);
																		}
																	})()
																}
																<a
																	href={this.state.target.link()}
																	download
																>
																	<Button
																		primary
																		icon
																		floated="right"
																		onClick={() => {

																		}}
																	>
																		Download
																		<Icon
																			name="download"
																		/>
																	</Button>
																</a>
															</React.Fragment>
														);
													}
												})()
											}
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Grid.Column>
						</Grid>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						positive
						onClick={() => {
							this.props.onClose();
						}}
					>
						close
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}

}

FilesComponent.propTypes = {
	files: PropTypes['array'].isRequired,
	onClose: PropTypes['func'].isRequired,
	onRemove: PropTypes['func'],
	onUpload: PropTypes['func'],
	visible: PropTypes['bool'].isRequired
};
