const initialState = {
	uploaded: []
};

export const FilesReducer = (state = initialState, action) => {
	switch (action['type']) {
		case 'Files/UPLOAD-COMPLETE': {
			let array = state['uploaded'].slice();
			array.push(action['payload']['file']['_id']);
			return Object.assign({}, state, {
				uploaded: array
			});
		}
		case 'Files/UPLOAD-RESET': {
			return initialState;
		}
		default: {
			return state;
		}
	}
};
