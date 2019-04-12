export class LocaleAction {

	static LOAD = 'Locale/LOAD';
	static SET = 'Locale/SET';
	static RESET = 'Locale/RESET';

	/**
	 * Loads string data
	 * @param locale
	 * @param strings
	 * @returns {{payload: {strings: *, locale: *}, type: string}}
	 */
	static load = (locale, strings) => {
		return {
			type: LocaleAction.LOAD,
			payload: {
				locale: locale,
				strings: strings
			}
		};
	};

	/**
	 * Sets the current locale
	 * @param locale
	 * @returns {{type: string, payload: {locale: *}}}
	 */
	static set = (locale) => {
		return {
			type: LocaleAction.SET,
			payload: {
				locale: locale
			}
		};
	};

	/**
	 * Resets locale
	 * @returns {{type: string}}
	 */
	static reset = () => {
		return {
			type: LocaleAction.RESET
		}
	};

}
