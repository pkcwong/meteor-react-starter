export class FilesAction {

	static UPLOAD = 'Files/UPLOAD';
	static UPLOAD_COMPLETE = 'Files/UPLOAD-COMPLETE';
	static RESET = 'Files/UPLOAD-RESET';

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

	static _UPLOAD_COMPLETE = (file) => {
		return {
			type: FilesAction.UPLOAD_COMPLETE,
			payload: {
				file: file
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
