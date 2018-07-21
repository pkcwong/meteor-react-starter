import { store } from "../store";

export class FilesAction {

	/**
	 * Uploads a file to GridFS
	 * @param file
	 */
	static upload = (file) => {
		store.dispatch({
			type: 'Files/UPLOAD',
			payload: {
				file: file
			}
		});
	};

}
