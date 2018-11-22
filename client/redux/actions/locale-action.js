export class LocaleAction {

	static SET = 'Locale/SET';

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
	 * @returns {{type: string}}
	 */
	static reset = () => {
		return {
			type: LocaleAction.SET,
			payload: {
				locale: 'en'
			}
		}
	};

}
