export class LoggerAction {

	static WRITE_COMPLETE = 'Logger/WRITE-COMPLETE';

	static log = (log) => {
		return {
			type: LoggerAction.WRITE_COMPLETE,
			payload: {
				log: log
			}
		};
	};

}
