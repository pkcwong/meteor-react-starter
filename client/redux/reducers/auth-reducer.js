import { AuthAction } from "../actions/auth-action";

const initialState = {
	status: "idle",
	message: ""
};

export const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case AuthAction.AUTH_STATUS: {
			return {
				...state,
				status: action.payload.status,
				message: action.payload.message
			};
		}
		default: {
			return state;
		}
	}
};
