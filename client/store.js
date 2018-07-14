import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { MeteorReducer } from "./reducers/meteor-reducer/meteor-reducer";
import { FilesReducer } from "./reducers/files-reducer/files-reducer";
import { MeteorSaga } from "./actions/meteor-saga/meteor-saga";
import { FilesSaga } from "./actions/files-saga/files-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	MeteorReducer: MeteorReducer,
	FilesReducer: FilesReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield all([
		MeteorSaga,
		FilesSaga
	].map(fork));
});
