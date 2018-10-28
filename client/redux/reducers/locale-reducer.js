import { LocaleAction } from "../actions/locale-action";

const extractor = (locale) => {
	const strings = {
		en: require('../../assets/strings/locale-en')
	};
	if (strings[locale] !== null) {
		return Object.assign({}, strings['en'], strings[locale]);
	} else {
		return strings['en'];
	}
};

const initialState = {
	locale: 'en',
	strings: extractor('en')
};

export const LocaleReducer = (state = initialState, action) => {
	switch (action['type']) {
		case LocaleAction.SET: {
			return {
				locale: action['payload']['locale'],
				strings: extractor(action['payload']['locale'])
			};
		}
		default: {
			return state;
		}
	}
};
