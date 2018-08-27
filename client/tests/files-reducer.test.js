import { FilesReducer } from "../redux/reducers/files-reducer";

describe('FilesReducer', () => {
	it('upload file', () => {
		expect(FilesReducer({
			uploaded: ['0']
		}, {
			type: 'Files/UPLOAD-COMPLETE',
			payload: {
				file: {
					_id: '1'
				}
			}
		})).toEqual({
			uploaded: ['0', '1']
		});
	});
	it('upload reset', () => {
		expect(FilesReducer({
			uploaded: ['0']
		}, {
			type: 'Files/UPLOAD-RESET',
			payload: null
		})).toEqual({
			uploaded: []
		});
	});
});
