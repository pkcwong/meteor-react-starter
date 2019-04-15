import { LoggerAction } from "../actions/logger-action";

const initialState = {
	logs: []
};

export const LoggerReducer = (state = initialState, action) => {
	switch (action.type) {
		case LoggerAction.WRITE_COMPLETE: {
			return Object.assign({}, state, {
				logs: [
					...state.logs,
					action.payload.log
				]
			});
		}
		default: {
			return state;
		}
	}
};
