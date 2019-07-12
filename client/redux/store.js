import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all, call, fork } from "redux-saga/effects";
import { AuthReducer } from "./auth/auth-reducer";
import { FileUploadReducer } from "./file-upload/file-upload-reducer";
import { FileRemoveReducer } from "./file-remove/file-remove-reducer";
import { LoggerSaga } from "./logger/logger-saga";
import { AuthSaga } from "./auth/auth-saga";
import { FileUploadSaga } from "./file-upload/file-upload-saga";
import { FileRemoveSaga } from "./file-remove/file-remove-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	AuthReducer,
	FileUploadReducer,
	FileRemoveReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield all([
		call(LoggerSaga),
		...[
			AuthSaga,
			FileUploadSaga,
			FileRemoveSaga
		].map(fork)
	]);
});
