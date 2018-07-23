import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { LoggerReducer } from "./reducers/logger-reducer";
import { CounterReducer } from "./reducers/counter-reducer";
import { FilesReducer } from "./reducers/files-reducer";
import { LoggerSaga } from "./sagas/logger-saga";
import { FilesSaga } from "./sagas/files-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	LoggerReducer: LoggerReducer,
	CounterReducer: CounterReducer,
	FilesReducer: FilesReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield all([
		LoggerSaga,
		FilesSaga
	].map(fork));
});
