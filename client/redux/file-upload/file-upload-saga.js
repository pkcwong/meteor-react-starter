import { eventChannel, END } from "redux-saga";
import { fork, put, select, take } from "redux-saga/effects";
import { Files } from "/shared/collections/files";
import { FileUploadAction } from "./file-upload-action";

const start = function* (action) {
	const upload = Files.insert({
		file: action.payload.file,
		streams: "dynamic",
		chunkSize: "dynamic"
	}, false);
	const uploadChannel = eventChannel((emitter) => {
		upload.on("progress", (progress) => {
			emitter(FileUploadAction.progress(action.payload.meta, progress));
		});
		upload.on("end", (err, file) => {
			if (err) {
				emitter(FileUploadAction.error(action.payload.meta, err));
				emitter(END);
				return;
			}
			emitter(FileUploadAction.success(action.payload.meta, file._id));
		});
		return (() => {
			upload.abort();
		});
	});
	upload.start();
	while (true) {
		const action = yield take(uploadChannel);
		yield put(action);
		if (action.type === FileUploadAction.SUCCESS || action.type === FileUploadAction.ERROR) {
			break;
		}
	}
};

export const FileUploadSaga = function* () {
	yield fork(function* () {
		while (true) {
			const action = yield take(FileUploadAction.START);
			const FilesUploadReducer = yield select((state) => {
				return state.FileUploadReducer;
			});
			if (!(FilesUploadReducer.files[action.payload.meta] && FilesUploadReducer.files[action.payload.meta].success && FilesUploadReducer.files[action.payload.meta].progress !== 100)) {
				yield fork(start, action);
			}
		}
	});
};
