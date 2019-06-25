import { Meteor } from 'meteor/meteor';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthAction } from "../actions/auth-action";

export const AuthSaga = function* () {
	yield takeLatest(AuthAction.AUTH_LOGIN, function* (action) {
		try {
			yield put(AuthAction._SetStatus_("idle", ""));
			yield call((payload) => {
				return new Promise((resolve, reject) => {
					Meteor.loginWithPassword(payload.username, payload.password, (err) => {
						if (err) {
							reject(err);
							return;
						}
						resolve();
					});
				});
			}, {
				username: action.payload.username,
				password: action.payload.password
			});
			yield put(AuthAction._SetStatus_("success", ""));
		} catch (err) {
			console.error(err);
			yield put(AuthAction._SetStatus_("fail", err.message));
		}
	});
	yield takeLatest(AuthAction.AUTH_LOGOUT, function* () {
		try {
			yield put(AuthAction._SetStatus_("idle", ""));
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
			yield put(AuthAction._SetStatus_("success", ""));
		} catch (err) {
			console.error(err);
			yield put(AuthAction._SetStatus_("fail", err.message));
		}
	});
};
