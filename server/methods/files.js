import { Meteor } from "meteor/meteor";
import { Files } from "../../shared/collections/files";

Meteor.methods({
	"Files/REMOVE": (json) => {
		return new Promise((resolve, reject) => {
			const file = Files.findOne(json._id);
			if (!file) {
				reject(new Meteor.Error(404));
				return;
			}
			if (!Meteor.userId()) {
				reject(new Meteor.Error(401));
				return;
			}
			if (file.userId !== Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), ["administrator"])) {
				reject(new Meteor.Error(403));
				return;
			}
			Files.remove(json._id, (err) => {
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		});
	}
});
