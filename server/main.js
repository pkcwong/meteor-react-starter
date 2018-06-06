import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	let root = Meteor.users.findOne({
		username: 'root'
	});
	if (!root) {
		let user = Accounts.createUser({
			username: 'root',
			password: 'root',
			profile: {
				name: 'Super User'
			}
		});
		Roles.addUsersToRoles(user, ['root', 'administrator']);
	}

});
