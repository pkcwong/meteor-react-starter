export class FilesAction {

	static LOAD = 'Files/LOAD';
	static LOAD_COMPLETE = 'Files/LOAD-COMPLETE';
	static UPLOAD = 'Files/UPLOAD';

	/**
	 * Loads a file from GridFS
	 * @param _id
	 * @param callback
	 * @returns {{type: string, payload: {_id: *}, callback: *}}
	 */
	static load = (_id, callback = null) => {
		return {
			type: FilesAction.LOAD,
			payload: {
				_id: _id
			},
			callback: callback ? callback : () => {
			}
		};
	};

	static __load_complete__ = (_id, uri) => {
		return {
			type: FilesAction.LOAD_COMPLETE,
			payload: {
				_id: _id,
				uri: uri
			}
		};
	};

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

}
