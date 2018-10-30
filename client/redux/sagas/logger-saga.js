import { put, takeEvery } from 'redux-saga/effects';
import { LoggerAction } from "../actions/logger-action";

export const LoggerSaga = function* () {
	yield takeEvery('*', function* (action) {
		if (action['type'] !== 'Logger/WRITE-COMPLETE') {
			console.log(action);
			yield put(LoggerAction._WRITE_COMPLETE(action));
		}
	});
};
