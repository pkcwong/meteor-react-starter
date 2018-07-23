import { LoggerReducer } from "./logger-reducer";

describe('LoggerReducer', () => {
	it('log entry', () => {
		expect(LoggerReducer({
			logs: ['0']
		}, {
			type: 'Logger/WRITE-COMPLETE',
			payload: {
				log: '1'
			}
		})).toEqual({
			logs: [
				'0',
				'1'
			]
		});
	});
});
