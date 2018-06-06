import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Comment, Form, Grid, Header, Icon, Input, List, Rating, TextArea } from 'semantic-ui-react';
import { FilesComponentContainer } from "../../components/files-component/container";
import { products_db } from "/shared/collections/products";

export class ProductPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			target: null,
			temp_images: [],
			temp_variations: [],
			reviews: []
		};
	}

	render() {
		return (
			<div
				style={{
					margin: "24px"
				}}
			>
				<Grid
					divided="vertically"
				>
					<Grid.Row>
						<Grid.Column
							width={8}
						>
							<FilesComponentContainer
								file_id_s={this.state.temp_images}
								onUpload={(file) => {
									let array = this.state.temp_images;
									array.push(file['_id']);
									this.setState({
										temp_images: array
									});
								}}
								onRemove={(file) => {
									let index = this.state.temp_images.indexOf(file['_id']);
									let array = this.state.temp_images;
									array.splice(index, 1);
									this.setState({
										temp_images: array
									});
								}}
								onTargetChange={(file_id) => {
									this.setState({
										target: file_id
									});
								}}
								sudo={
									(() => {
										let product = products_db.findOne({
											_id: this.props.params['_id']
										});
										return (Roles.userIsInRole(Meteor.userId(), ['administrator']) || (product && Meteor.userId() === product['owner']));
									})()
								}
								onMount={this.mountedFilesComponent.bind(this)}
							/>
						</Grid.Column>
						<Grid.Column
							width={8}
						>
							{
								(() => {
									let product = products_db.findOne({
										_id: this.props.params['_id']
									});
									if (product && product['owner'] !== Meteor.userId()) {
										return (
											//TODO price category
											<div>
												<Header
													as="h1"
												>
													{product['header']}
												</Header>
												<Header
													as="h2"
												>
													{product['sub-header']}
												</Header>
												<Rating
													icon="star"
													defaultRating={
														(() => {
															let tot = product['reviews'].map((e) => {
																return e['rating'];
															}).reduce((acc, val) => {
																return acc + val()
															});
															if (product['reviews'].length === 0) {
																return 0;
															} else {
																return tot / product['reviews'];
															}
														})()
													}
													maxRating={5}
													disabled={true}
												/>
												<p>
													Price:
												</p>
											</div>
										);
									} else if ((product && product['owner'] === Meteor.userId()) || this.props.params['_id'] === '0') {
										return (
											//TODO price category
											<div>
												<Form>
													<Form.Field>
														<label>
															Header
														</label>
														<Input
															name="header"
														/>
													</Form.Field>
													<Form.Field>
														<label>
															Sub-Header
														</label>
														<Input
															name="sub-header"
														/>
													</Form.Field>
													<Form.Field>
														<label>
															Stock
														</label>
														<Input
															name="stock"
														/>
													</Form.Field>
												</Form>
												<List>
													<List.Item>
														<List.Content>
															<List.Header>
																Variations
															</List.Header>
															<List.Description>
																product variations
															</List.Description>
															<List.List>
																{
																	this.state.temp_variations.map((item) => {
																		return (
																			<List.Item
																				key={item['name']}
																				onClick={() => {
																					this.FilesComponentCallback.setTarget(item['target']);
																				}}
																			>
																				<List.Header>
																					{item['name']}
																					<Icon
																						name="window close"
																						onClick={() => {
																							let index = this.state.temp_variations.map((e) => {
																								return e['name'];
																							}).indexOf(item['name']);
																							let array = this.state.temp_variations;
																							array.splice(index, 1);
																							this.setState({
																								temp_variations: array
																							});
																						}}
																					/>
																				</List.Header>
																			</List.Item>
																		);
																	})
																}
																<List.Item>
																	<Input
																		id="product-page-variation-input"
																		action={
																			<Button
																				content="add"
																				onClick={() => {
																					let name = $("#product-page-variation-input").val();
																					let array = this.state.temp_variations;
																					array.push({
																						name: name,
																						target: this.state.target
																					});
																					this.setState({
																						temp_variations: array
																					});
																					$("#product-page-variation-input").val("");
																				}}
																			/>
																		}
																	/>
																</List.Item>
															</List.List>
														</List.Content>
													</List.Item>
												</List>
												{
													(() => {
														if (this.props.params['_id'] === '0') {
															return (
																<Button
																	primary
																	floated="right"
																	type="button"
																	content="publish"
																	onClick={() => {
																		let header = $("input[name='header']").val();
																		let sub = $("input[name='sub-header']").val();
																		let stock = $("input[name='stock']").val();
																		let temp_images = this.state.temp_images;
																		let temp_variations = this.state.temp_variations;
																		let owner = Meteor.userId();
																		let _id = products_db.insert({
																			header: header,
																			"sub-header": sub,
																			stock: stock,
																			images: temp_images,
																			variations: temp_variations,
																			reviews: [],
																			owner: owner
																		});
																		FlowRouter.go('/product/' + _id);
																	}}
																/>
															);
														} else {
															return (
																<Button
																	primary
																	floated="right"
																	type="button"
																	content="update"
																	onClick={() => {

																	}}
																/>
															);
														}
													})()
												}
											</div>
										);
									} else {
										return null;
									}
								})()
							}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Comment.Group>
								<Header
									as="h3"
								>
									Reviews
								</Header>
								{
									(() => {
										let product = products_db.findOne({
											_id: this.props.params['_id']
										});
										if (product) {
											return product['reviews'].map((item) => {
												return (
													<Comment>
														<Comment.Content>
															<Comment.Author>
																{
																	(() => {
																		let user = Meteor.users.findOne({
																			_id: item['user']
																		});
																		if (user) {
																			return user['profile']['name'];
																		} else {
																			return null;
																		}
																	})()
																}
																<Rating
																	icon="star"
																	defaultRating={item['rating']}
																	maxRating={5}
																	disabled={true}
																/>
															</Comment.Author>
															<Comment.Text>
																{item['text']}
															</Comment.Text>
														</Comment.Content>
													</Comment>
												)
											});
										} else {
											return null;
										}
									})()
								}
							</Comment.Group>
						</Grid.Column>
					</Grid.Row>
					{
						(() => {
							let product = products_db.findOne({
								_id: this.props.params['_id']
							});
							if (product) {
								return (
									<Grid.Row>
										<Grid.Column>
											<Form>
												<Rating
													icon="star"
													defaultRating={3}
													maxRating={5}
												/>
												<TextArea
													placeholder="write a review"
												/>
												<Form.Button
													type="button"
													floated="right"
													primary
													onClick={() => {
														//TODO push reviews
													}}
												>
													submit
												</Form.Button>
											</Form>
										</Grid.Column>
									</Grid.Row>
								);
							} else {
								return null;
							}
						})()
					}
				</Grid>
			</div>
		);
	}

	componentWillUpdate() {
		let product = products_db.findOne({
			_id: this.props.params['_id']
		});
		if (product) {
			$("input[name='header']").val(product['header']);
			$("input[name='sub-header']").val(product['sub-header']);
			$("input[name='stock']").val(product['stock']);
			if (this.state.temp_images.length !== product['images'].length) {
				this.setState({
					temp_images: product['images']
				});
			}
			if (this.state.temp_variations.length !== product['variations'].length) {
				this.setState({
					temp_variations: product['variations']
				});
			}
		}
	}

	mountedFilesComponent(callback) {
		this.FilesComponentCallback = callback;
	}

}
