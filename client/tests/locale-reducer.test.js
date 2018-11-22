import { LocaleReducer } from "../redux/reducers/locale-reducer";
import { LocaleAction } from "../redux/actions/locale-action";

describe('LocaleReducer', () => {
	it('should set locale', () => {
		expect(LocaleReducer({
			locale: 'en'
		}, LocaleAction.set('zh'))['locale']).toEqual('zh');
	});
	it('should reset locale', () => {
		expect(LocaleReducer({
			locale: 'zh'
		}, LocaleAction.reset())['locale']).toEqual('en');
	})
});
