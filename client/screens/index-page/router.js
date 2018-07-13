import { mount } from 'react-mounter';
import { store } from "../../store";
import { IndexPage } from "./index-page";

FlowRouter.route('/', {
	action: (params) => {
		mount(IndexPage, {
			store: store,
			params: params
		});
	}
});
