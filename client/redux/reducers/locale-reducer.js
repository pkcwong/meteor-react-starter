import { LocaleAction } from "../actions/locale-action";

const initialState = {
	locale: 'en',
	strings: {},
	data: {}
};

export const LocaleReducer = (state = initialState, action) => {
	switch (action.type) {
		case LocaleAction.LOAD: {
			if (state.locale !== action.payload.locale) {
				return Object.assign({}, state, {
					data: Object.assign({}, state.data, {
						[action.payload.locale]: action.payload.strings
					})
				});
			} else {
				return Object.assign({}, state, {
					strings: Object.assign({}, state.strings, action.payload.strings),
					data: Object.assign({}, state.data, {
						[action.payload.locale]: action.payload.strings
					})
				});
			}
		}
		case LocaleAction.SET: {
			return Object.assign({}, state, {
				locale: action.payload.locale,
				strings: Object.assign({}, state.strings, state.data[action.payload.locale])
			});
		}
		case LocaleAction.RESET: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};
