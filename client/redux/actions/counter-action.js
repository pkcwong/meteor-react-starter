import { store } from "../store";

export class CounterAction {

	/**
	 * Increments counter
	 */
	static increment = () => {
		store.dispatch({
			type: 'Counter/INCREMENT'
		});
	};

	/**
	 * Resets counter
	 */
	static reset = () => {
		store.dispatch({
			type: 'Counter/RESET'
		});
	};

}
