export class FilesAction {

	static UPLOAD = 'Files/UPLOAD';
	static UPLOAD_COMPLETE = 'Files/UPLOAD-COMPLETE';
	static RESET = 'Files/RESET';

	/**
	 * Uploads a file to GridFS
	 * @param file
	 * @param callback
	 */
	static upload = (file, callback = null) => {
		return {
			type: FilesAction.UPLOAD,
			payload: {
				file: file,
				callback: callback
			}
		};
	};

	/**
	 * Resets the upload cache
	 * @returns {{type: string}}
	 */
	static reset = () => {
		return {
			type: FilesAction.RESET
		};
	};

}
