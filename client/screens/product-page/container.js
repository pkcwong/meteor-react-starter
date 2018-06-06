import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import { withTracker } from 'meteor/react-meteor-data';
import { ProductPage } from "./product-page.jsx";
import { products_db } from "/shared/collections/products";

FlowRouter.route('/product/:_id', {
	action: (params) => {
		mount(ProductPageContainer, {
			params: params
		});
	}
});

export const ProductPageContainer = withTracker(() => {
	Meteor.subscribe('users_db');
	Meteor.subscribe('products_db');
	return {
		Meteor: {
			collection: {
				users: Meteor.users.find().fetch(),
				products: products_db.find().fetch()
			},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(ProductPage);
