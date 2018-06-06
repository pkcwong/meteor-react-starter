import { Meteor } from 'meteor/meteor';
import { products_db } from "/shared/collections/products";

Meteor.publish('products_db', () => {
	return products_db.find();
});

products_db.allow({
	insert: (userId, doc) => {
		return (Roles.userIsInRole(userId, ['administrator']) || Roles.userIsInRole(userId, ['shop']));
	},
	update: (userId, doc, fieldNames, modifier) => {
		return (Roles.userIsInRole(userId, ['administrator']) || userId === doc['owner']);
	},
	remove: (userId, doc) => {
		return (Roles.userIsInRole(userId, ['administrator']) || userId === doc['owner']);
	}
});
