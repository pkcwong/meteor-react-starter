import { Meteor } from "meteor/meteor";
import { call, put, takeEvery } from "redux-saga/effects";
import { message } from "antd";
import { FileRemoveAction } from "./file-remove-action";

const start = function* (action) {
	try {
		yield call(() => {
			return new Promise((resolve, reject) => {
				Meteor.call("Files/REMOVE", {
					_id: action.payload._id
				}, (err, res) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(res);
				});
			});
		});
		yield put(FileRemoveAction.success(action.payload._id));
	} catch (err) {
		yield put(FileRemoveAction.error(action.payload._id, err.error));
	}
};

const error = function* (action) {
	message.error(action.payload.message);
};


export const FileRemoveSaga = function* () {
	yield takeEvery(FileRemoveAction.START, start);
	yield takeEvery(FileRemoveAction.ERROR, error);
};
