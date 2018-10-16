import { call, put, takeEvery } from 'redux-saga/effects';
import { Files } from "/shared/collections/files";
import { FilesAction } from "../actions/files-action";

export const FilesSaga = function* () {
	yield takeEvery(FilesAction.UPLOAD, function* (action) {
		try {
			let res = yield call((payload) => {
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
				file: action['payload']['file']
			});
			yield put({
				type: FilesAction.UPLOAD_COMPLETE,
				payload: {
					file: res
				}
			});
			yield call((payload) => {
				if (payload['callback'] !== null) {
					payload['callback'](payload['file']);
				}
			}, {
				file: res,
				callback: action['payload']['callback']
			});
		} catch (err) {
			console.error(err);
		}
	});
};
