import { call, takeEvery } from 'redux-saga/effects';
import { Files } from "/shared/collections/files";
import { FilesAction } from "../actions/files-action";

export const FilesSaga = function* () {
	yield takeEvery(FilesAction.LOAD, function* (action) {
		try {
			let file = yield call((payload) => {
				return new Promise((resolve) => {
					resolve(Files.findOne({
						_id: payload['_id']
					}));
				});
			}, {
				_id: action.payload['_id']
			});
			yield call((payload) => {
				action.callback(null, payload);
			}, {
				uri: file.link()
			});
		} catch (err) {
			console.error(err);
			action.callback(err, null);
		}
	});
	yield takeEvery(FilesAction.UPLOAD, function* (action) {
		try {
			let file = yield call((payload) => {
				return new Promise((resolve, reject) => {
					const upload = Files.insert({
						file: payload['file'],
						streams: 'dynamic',
						chunkSize: 'dynamic'
					}, false);
					upload.on('end', (err, file) => {
						if (!err) {
							resolve(file);
						} else {
							reject(err);
						}
					});
					upload.start();
				});
			}, {
				file: action.payload['file']
			});
			yield call((payload) => {
				action.callback(null, payload);
			}, {
				_id: file._id,
				uri: Files.link(file)
			});
		} catch (err) {
			console.error(err);
			action.callback(err, null);
		}
	});
};
