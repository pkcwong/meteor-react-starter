import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
	const root = Meteor.users.findOne({
		username: "root"
	});
	if (!root) {
		let user = Accounts.createUser({
			username: "root",
			password: "root",
			profile: {
				name: "Default User"
			}
		});
		Roles.addUsersToRoles(user, [
			"root",
			"administrator"
		]);
	}
});
