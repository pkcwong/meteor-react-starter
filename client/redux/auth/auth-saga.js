import { Meteor } from "meteor/meteor";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { message } from "antd";
import { AuthAction } from "./auth-action";

const login = function* (action) {
	try {
		yield call(() => {
			return new Promise((resolve, reject) => {
				Meteor.loginWithPassword(action.payload.username, action.payload.password, (err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});
			});
		});
		yield put(AuthAction.loginSuccess());
	} catch (err) {
		yield put(AuthAction.error(err.error));
	}
};

const logout = function* () {
	try {
		yield call(() => {
			return new Promise((resolve, reject) => {
				Meteor.logout((err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});
			});
		});
		yield put(AuthAction.logoutSuccess());
	} catch (err) {
		yield put(AuthAction.error(err.error));
	}
};

const error = function* (action) {
	message.error(action.payload.message);
};

export const AuthSaga = function* () {
	yield takeLatest(AuthAction.LOGIN, login);
	yield takeLatest(AuthAction.LOGOUT, logout);
	yield takeEvery(AuthAction.ERROR, error);
};
