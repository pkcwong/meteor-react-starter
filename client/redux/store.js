import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, call, fork } from 'redux-saga/effects';
import { LoggerReducer } from "./reducers/logger-reducer";
import { AuthReducer } from "./reducers/auth-reducer";
import { LocaleReducer } from "./reducers/locale-reducer";
import { LoggerSaga } from "./sagas/logger-saga";
import { AuthSaga } from "./sagas/auth-saga";
import { FilesSaga } from "./sagas/files-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	LoggerReducer,
	AuthReducer,
	LocaleReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield all([
		call(LoggerSaga),
		...[
			AuthSaga,
			FilesSaga
		].map(fork)
	]);
});
