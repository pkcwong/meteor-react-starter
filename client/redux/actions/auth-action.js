export class AuthAction {

	static AUTH_STATUS = "Auth/STATUS";
	static AUTH_LOGIN = "Auth/LOGIN";
	static AUTH_LOGOUT = "Auth/LOGOUT";

	static _SetStatus_ = (status, message) => {
		return {
			type: AuthAction.AUTH_STATUS,
			payload: {
				status: status,
				message: message
			}
		};
	};

	static login = (username, password) => {
		return {
			type: AuthAction.AUTH_LOGIN,
			payload: {
				username: username,
				password: password
			}
		};
	};

	static logout = () => {
		return {
			type: AuthAction.AUTH_LOGOUT
		};
	};

}
