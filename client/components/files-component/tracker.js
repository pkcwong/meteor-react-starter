import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FilesComponentContainer } from "./container";
import { Files } from "/shared/collections/files";

export const FilesComponentContainerTracker = withTracker((props) => {
	Meteor.subscribe("files_db");
	return Object.assign({
		Meteor: {
			collection: {
				files: Files.find().fetch()
			}
		}
	}, props);
})(FilesComponentContainer);
