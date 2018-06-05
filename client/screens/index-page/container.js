import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import { withTracker } from 'meteor/react-meteor-data';
import { IndexPage } from "./index-page";

FlowRouter.route('/', {
	action: () => {
		mount(IndexPageContainer, {});
	}
});

export const IndexPageContainer = withTracker(() => {
	return {
		Meteor: {
			collection: {},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(IndexPage);
