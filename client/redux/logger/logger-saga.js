import { takeEvery } from "redux-saga/effects";

export const LoggerSaga = function* () {
	yield takeEvery("*", function* (action) {
		console.log(action);
	});
};
