import { mount } from 'react-mounter';
import { IndexPageTracker } from "./tracker";

FlowRouter.route('/', {
	action: () => {
		mount(IndexPageTracker, {});
	}
});
