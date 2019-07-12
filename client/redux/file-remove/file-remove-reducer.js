import { FileRemoveAction } from "./file-remove-action";

const initialState = {
	files: {}
};

export const FileRemoveReducer = (state = initialState, action) => {
	switch (action.type) {
		case FileRemoveAction.SUCCESS: {
			return {
				...state.files,
				[action.payload._id]: {
					success: true,
					message: ""
				}
			};
		}
		case FileRemoveAction.ERROR: {
			return {
				...state.files,
				[action.payload._id]: {
					success: false,
					message: action.payload.message
				}
			};
		}
		default: {
			return state;
		}
	}
};
