export class CounterAction {

	/**
	 * Increments counter
	 */
	static increment = () => {
		return {
			type: 'Counter/INCREMENT'
		};
	};

	/**
	 * Resets counter
	 */
	static reset = () => {
		return {
			type: 'Counter/RESET'
		};
	};

}
