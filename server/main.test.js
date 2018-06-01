import { Meteor } from 'meteor/meteor';
const assert = require('assert');

describe('main', function() {
	it('import Meteor', function() {
		assert.notEqual(Meteor, undefined);
	});
});
