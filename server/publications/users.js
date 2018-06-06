import { Meteor } from 'meteor/meteor';

Meteor.publish('users_db', () => {
	return Meteor.users.find();
});
