import { FileUploadAction } from "./file-upload-action";

const initialState = {
	files: {}
};

export const FileUploadReducer = (state = initialState, action) => {
	switch (action.type) {
		case FileUploadAction.RESET: {
			return initialState;
		}
		case FileUploadAction.PROGRESS: {
			return {
				...state,
				files: {
					...state.files,
					[action.payload.meta]: {
						success: true,
						message: "",
						progress: action.payload.progress,
						_id: null
					}
				}
			};
		}
		case FileUploadAction.SUCCESS: {
			return {
				...state,
				files: {
					...state.files,
					[action.payload.meta]: {
						...state.files[action.payload.meta],
						success: true,
						message: "",
						progress: 100,
						_id: action.payload._id
					}
				}
			};
		}
		case FileUploadAction.ERROR: {
			return {
				...state,
				files: {
					...state.files,
					[action.payload.meta]: {
						...state.files[action.payload.meta],
						success: false,
						message: action.payload.message,
						_id: null
					}
				}
			};
		}
		default: {
			return state;
		}
	}
};
