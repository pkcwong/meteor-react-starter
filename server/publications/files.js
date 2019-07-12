import { Meteor } from "meteor/meteor";
import { Files } from "../../shared/collections/files";

Meteor.publish("files_db", function () {
	const reference = this;
	const transform = (doc) => {
		doc.link = Files.link(Files.collection.findOne(doc._id));
		return doc;
	};
	const observer = Files.find().observe({
		added: (document) => {
			reference.added("files", document._id, transform(document));
		},
		changed: (newDocument) => {
			reference.changed("files", newDocument._id, transform(newDocument));
		},
		removed: (oldDocument) => {
			reference.removed("files", oldDocument._id);
		}
	});
	reference.onStop(function () {
		observer.stop();
	});
	reference.ready();
});
