import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { MeteorReducer } from "./reducers/meteor-reducer";
import { MeteorSaga } from "./actions/meteor-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	MeteorReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield [
		fork(MeteorSaga)
	];
});
