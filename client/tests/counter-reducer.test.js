import { CounterReducer } from "../redux/reducers/counter-reducer";
import { CounterAction } from "../redux/actions/counter-action";

describe('CounterReducer', () => {
	it('increment counter', () => {
		expect(CounterReducer({
			counter: 0
		}, CounterAction.increment())).toEqual({
			counter: 1
		});
	});
	it('reset counter', () => {
		expect(CounterReducer({
			counter: 1
		}, CounterAction.reset())).toEqual({
			counter: 0
		});
	});
});
