import React from 'react';
import PropTypes from 'prop-types';
import { FilesComponent } from "./files-component";
import { Files } from "/shared/collections/files";

export class FilesComponentContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
		this.methods = {
			show: () => {
				this.setState({
					visible: true
				});
			},
			hide: () => {
				this.setState({
					visible: false
				});
			}
		};
	}

	render() {
		return (
			<FilesComponent
				files={
					(() => {
						let array = [];
						this.props.files.forEach((item) => {
							let file = Files.findOne({
								_id: item
							});
							if (file) {
								array.push(file);
							}
						});
						return array;
					})()
				}
				onClose={() => {
					this.methods.hide()
				}}
				onRemove={
					(() => {
						if (this.props.onRemove) {
							return (
								(file) => {
									Files.remove({
										_id: file['_id']
									});
									this.props.onRemove(file['_id']);
								}
							);
						} else {
							return null;
						}
					})()
				}
				onUpload={
					(() => {
						if (this.props.onUpload) {
							return (
								(file) => {
									const upload = Files.insert({
										file: file,
										streams: 'dynamic',
										chunkSize: 'dynamic'
									}, false);
									upload.on('end', (err, file) => {
										if (err) {
											console.error(err);
										} else {
											this.props.onUpload(file['_id']);
										}
									});
									upload.start();
								}
							);
						} else {
							return null;
						}
					})()
				}
				visible={this.state.visible}
			/>
		);
	}

	componentDidMount() {
		this.props.onMount(this.methods);
	}

}

FilesComponentContainer.propTypes = {
	files: PropTypes['array'].isRequired,
	onMount: PropTypes['func'].isRequired,
	onRemove: PropTypes['func'],
	onUpload: PropTypes['func']
};
