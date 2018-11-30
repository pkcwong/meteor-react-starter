import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, call, fork } from 'redux-saga/effects';
import { LoggerReducer } from "./reducers/logger-reducer";
import { LocaleReducer } from "./reducers/locale-reducer";
import { LoggerSaga } from "./sagas/logger-saga";
import { FilesSaga } from "./sagas/files-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	LoggerReducer,
	LocaleReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield all([
		call(LoggerSaga),
		...[
			FilesSaga
		].map(fork)
	]);
});
