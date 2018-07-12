import { Meteor } from 'meteor/meteor';
import { release } from "../index";

Meteor.methods({
	'meteor': () => {
		return release();
	}
});
