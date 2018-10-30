export class LoggerAction {

	static WRITE_COMPLETE = 'Logger/WRITE-COMPLETE';

	static _WRITE_COMPLETE = (log) => {
		return {
			type: LoggerAction.WRITE_COMPLETE,
			payload: {
				log: log
			}
		};
	};

}
