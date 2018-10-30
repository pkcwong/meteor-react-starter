import { Meteor } from 'meteor/meteor';

Meteor.publish('users_db', () => {
	return Meteor.users.find({}, {
		fields: {
			_id: true,
			username: true,
			createdAt: true,
			profile: true,
			roles: true
		}
	});
});
