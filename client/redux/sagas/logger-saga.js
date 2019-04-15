import { put, takeEvery } from 'redux-saga/effects';
import { LoggerAction } from "../actions/logger-action";

export const LoggerSaga = function* () {
	yield takeEvery('*', function* (action) {
		if (action.type !== LoggerAction.WRITE_COMPLETE) {
			console.log(action);
			yield put(LoggerAction.log(action));
		}
	});
};
