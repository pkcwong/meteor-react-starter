import { FilesAction } from "../actions/files-action";

const initialState = {
	uploaded: []
};

export const FilesReducer = (state = initialState, action) => {
	switch (action['type']) {
		case FilesAction.UPLOAD_COMPLETE: {
			let array = state['uploaded'].slice();
			array.push(action['payload']['file']['_id']);
			return Object.assign({}, state, {
				uploaded: array
			});
		}
		case FilesAction.RESET: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};
