import { AuthAction } from "./auth-action";

const initialState = {
	error: false,
	message: ""
};

export const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case AuthAction.LOGIN_SUCCESS: {
			return {
				...state,
				error: false,
				message: ""
			};
		}
		case AuthAction.LOGOUT_SUCCESS: {
			return {
				...state,
				error: false,
				message: ""
			};
		}
		case AuthAction.ERROR: {
			return {
				...state,
				error: true,
				message: action.payload.message
			};
		}
		default: {
			return state;
		}
	}
};
