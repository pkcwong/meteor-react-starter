import { Meteor } from 'meteor/meteor';
const assert = require('assert');

describe('main', function() {
	it('should import Meteor', function() {
		assert.ok(Meteor);
	});
});
