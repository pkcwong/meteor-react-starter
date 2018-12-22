import { Meteor } from 'meteor/meteor';
import { app } from "../express";

app.get('/api/meteor', [], Meteor.bindEnvironment((request, response, next) => {
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});
	response.end(JSON.stringify({
		release: Meteor.release
	}));
}));
