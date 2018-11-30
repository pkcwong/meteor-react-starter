export class FilesAction {

	static UPLOAD = 'Files/UPLOAD';
	static REMOVE = 'Files/REMOVE';

	/**
	 * Uploads a file to GridFS
	 * @param file
	 * @param callback
	 */
	static upload = (file, callback = null) => {
		return {
			type: FilesAction.UPLOAD,
			payload: {
				file: file
			},
			callback: callback ? callback : () => {
			}
		};
	};

	/**
	 * Removes a file from GridFS
	 * @param _id
	 * @param callback
	 * @returns {{type: string, payload: {_id: *}, callback: Function}}
	 */
	static remove = (_id, callback) => {
		return {
			type: FilesAction.REMOVE,
			payload: {
				_id: _id
			},
			callback: callback ? callback : () => {
			}
		}
	}

}
