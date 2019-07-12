export class AuthAction {

	static LOGIN = "Auth/LOGIN";
	static LOGIN_SUCCESS = "Auth/LOGIN-SUCCESS";
	static LOGOUT = "Auth/LOGOUT";
	static LOGOUT_SUCCESS = "Auth/LOGOUT-SUCCESS";
	static ERROR = "Auth/ERROR";

	static login = (username, password) => {
		return {
			type: AuthAction.LOGIN,
			payload: {
				username: username,
				password: password
			}
		};
	};

	static loginSuccess = () => {
		return {
			type: AuthAction.LOGIN_SUCCESS
		};
	};

	static logout = () => {
		return {
			type: AuthAction.LOGOUT
		};
	};

	static logoutSuccess = () => {
		return {
			type: AuthAction.LOGOUT_SUCCESS
		};
	};

	static error = (code) => {
		const message = {
			400: "Username cannot be empty.",
			403: "Incorrect username or password."
		};
		return {
			type: AuthAction.ERROR,
			payload: {
				message: message[code]
			}
		};
	};

}
