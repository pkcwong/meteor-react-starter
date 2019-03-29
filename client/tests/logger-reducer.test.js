import { LoggerReducer } from "../redux/reducers/logger-reducer";
import { LoggerAction } from "../redux/actions/logger-action";

describe('LoggerReducer', () => {
	it('should log entry', () => {
		expect(LoggerReducer({
			logs: ['0']
		}, LoggerAction.log('1'))).toEqual({
			logs: [
				'0',
				'1'
			]
		});
	});
});
