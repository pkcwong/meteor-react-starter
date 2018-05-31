import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import { withTracker } from 'meteor/react-meteor-data';
import { Index } from "./index";

FlowRouter.route('/', {
	action: () => {
		mount(IndexContainer, {});
	}
});

export const IndexContainer = withTracker(() => {
	return {
		Meteor: {
			collection: {},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(Index);
