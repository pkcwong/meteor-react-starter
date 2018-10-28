export class LocaleAction {

	static SET = 'Locale/SET';
	static RESET = 'Locale/RESET';

	/**
	 * Sets the current language
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
	 * Resets the language
	 * @param locale
	 * @returns {{type: string}}
	 */
	static reset = (locale) => {
		return {
			type: LocaleAction.RESET
		}
	};

}
