import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { CounterReducer } from "./reducers/counter-reducer";
import { FilesReducer } from "./reducers/files-reducer";
import { FilesSaga } from "./sagas/files-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	CounterReducer: CounterReducer,
	FilesReducer: FilesReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield all([
		FilesSaga
	].map(fork));
});
