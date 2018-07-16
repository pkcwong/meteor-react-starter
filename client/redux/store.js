import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { FilesReducer } from "./reducers/files-reducer";
import { FilesSaga } from "./sagas/files-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	FilesReducer: FilesReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield all([
		FilesSaga
	].map(fork));
});
