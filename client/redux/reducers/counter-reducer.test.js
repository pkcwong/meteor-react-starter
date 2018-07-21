import { CounterReducer } from "./counter-reducer";

describe('CounterReducer', () => {
	it('increment counter', () => {
		expect(CounterReducer({
			counter: 0
		}, {
			type: 'Counter/INCREMENT'
		})).toEqual({
			counter: 1
		});
	});
	it('reset counter', () => {
		expect(CounterReducer({
			counter: 1
		}, {
			type: 'Counter/INCREMENT'
		})).toEqual({
			counter: 0
		});
	});
});
