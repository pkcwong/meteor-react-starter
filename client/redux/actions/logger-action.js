export class LoggerAction {

	/**
	 * Write a log entry
	 * @param action redux action
	 * @returns {{type: *, payload: *}}
	 */
	static write = (action) => {
		return {
			type: action['type'],
			payload: action['payload']
		};
	};

}
