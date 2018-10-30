import { FilesReducer } from "../redux/reducers/files-reducer";
import { FilesAction } from "../redux/actions/files-action";

describe('FilesReducer', () => {
	it('should upload file', () => {
		expect(FilesReducer({
			uploaded: ['0']
		}, FilesAction._UPLOAD_COMPLETE({
			_id: '1'
		}))).toEqual({
			uploaded: ['0', '1']
		});
	});
	it('should reset upload', () => {
		expect(FilesReducer({
			uploaded: ['0']
		}, FilesAction.reset())).toEqual({
			uploaded: []
		});
	});
});
