export class FilesAction {

	/**
	 * Uploads a file to GridFS
	 * @param file
	 */
	static upload(file) {
		return {
			type: 'Files/UPLOAD',
			payload: {
				file: file
			}
		};
	};

}
