import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FilesComponent } from "./files-component";
import { Files } from "../../../shared/collections/files";

export const FilesComponentContainer = withTracker(() => {
	Meteor.subscribe('files_db');
	return {
		Meteor: {
			collection: {
				files: Files.find().fetch()
			},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(FilesComponent);
