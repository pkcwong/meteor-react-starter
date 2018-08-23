import { mount } from 'react-mounter';
import { store } from "../../redux/store";
import { IndexPage } from "./index-page";

FlowRouter.route('/', {
	action: (params) => {
		document.title = 'meteor-react-starter';
		mount(IndexPage, {
			store: store,
			params: params
		});
	}
});
