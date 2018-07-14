import { call, put, takeEvery } from 'redux-saga/effects';
import { Files } from "/shared/collections/files";

export const FilesSaga = function* () {
	yield takeEvery('Files/UPLOAD', function* (action) {
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
				type: 'Files/UPLOAD-COMPLETE',
				payload: {
					file: res
				}
			});
		} catch (err) {
			console.error(err);
		}
	});
};
