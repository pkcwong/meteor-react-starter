import { call, put, takeLatest } from 'redux-saga/effects';

export const MeteorSaga = function* () {
	yield takeLatest('Meteor/RELEASE-FETCH', function* (action) {
		try {
			let res = yield call((payload) => {
				return new Promise((resolve, reject) => {
					Meteor.call('meteor', (err, res) => {
						if (!err) {
							resolve(res);
						} else {
							reject(err);
						}
					});
				}).then((res) => {
					return res;
				});
			});
			yield put({
				type: 'Meteor/RELEASE-FETCH-COMPLETE',
				payload: res
			});
		} catch (err) {
			console.error(err);
		}
	})
};
