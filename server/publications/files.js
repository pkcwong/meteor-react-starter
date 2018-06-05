import { Meteor } from 'meteor/meteor';
import { Files } from "/shared/collections/files";

Meteor.publish('files_db', () => {
	return Files.find().cursor;
});
