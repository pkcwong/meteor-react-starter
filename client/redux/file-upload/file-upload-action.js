export class FileUploadAction {

	static RESET = "FileUpload/RESET";
	static START = "FileUpload/START";
	static PROGRESS = "FileUpload/PROGRESS";
	static SUCCESS = "FileUpload/SUCCESS";
	static ERROR = "FileUpload/ERROR";

	static reset = () => {
		return {
			type: FileUploadAction.RESET
		};
	};

	static start = (meta, file) => {
		return {
			type: FileUploadAction.START,
			payload: {
				meta: meta,
				file: file
			}
		};
	};

	static progress = (meta, progress) => {
		return {
			type: FileUploadAction.PROGRESS,
			payload: {
				meta: meta,
				progress: progress
			}
		};
	};

	static success = (meta, _id) => {
		return {
			type: FileUploadAction.SUCCESS,
			payload: {
				meta: meta,
				_id: _id
			}
		};
	};

	static error = (meta, message) => {
		return {
			type: FileUploadAction.ERROR,
			payload: {
				meta: meta,
				message: message
			}
		};
	};

}
