import { put, takeEvery } from 'redux-saga/effects';

export const LoggerSaga = function* () {
	yield takeEvery('*', function* (action) {
		if (action['type'] !== 'Logger/WRITE-COMPLETE') {
			yield put({
				type: 'Logger/WRITE-COMPLETE',
				payload: {
					log: action
				}
			});
		}
	});
};
