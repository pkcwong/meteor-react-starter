export class FileRemoveAction {

	static RESET = "FileRemove/RESET";
	static START = "FileRemove/START";
	static SUCCESS = "FileRemove/SUCCESS";
	static ERROR = "FileRemove/ERROR";

	static reset = () => {
		return {
			type: FileRemoveAction.RESET
		};
	};

	static start = (_id) => {
		return {
			type: FileRemoveAction.START,
			payload: {
				_id: _id
			}
		};
	};

	static success = (_id) => {
		return {
			type: FileRemoveAction.SUCCESS,
			payload: {
				_id: _id
			}
		};
	};

	static error = (_id, code) => {
		const message = {
			404: "File not found.",
			401: "Not Logged in.",
			403: "Unauthorized to perform such action."
		};
		return {
			type: FileRemoveAction.ERROR,
			payload: {
				_id: _id,
				message: message[code]
			}
		};
	};

}
