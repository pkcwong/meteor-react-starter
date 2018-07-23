const initialState = {
	counter: 0
};

export const CounterReducer = (state = initialState, action) => {
	switch (action['type']) {
		case 'Counter/INCREMENT': {
			return Object.assign({}, state, {
				counter: state['counter'] + 1
			});
		}
		case 'Counter/RESET': {
			return initialState;
		}
		default: {
			return state;
		}
	}
};
