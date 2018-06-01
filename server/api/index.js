import { Meteor } from 'meteor/meteor';

const API = new Restivus({
	prettyJson: true
});

export const Rest = API;

Rest.addRoute('', {}, {
	get: () => {
		return {
			statusCode: 200,
			body: {
				release: Meteor.release
			}
		}
	}
});
