import { Meteor } from 'meteor/meteor';
import bodyParser from 'body-parser';
import { Files } from "../../../shared/collections/files";
import { app } from "../express";

const _multer = require('multer');
const _fs = require('fs');

const _multerInstanceConfig = {
	dest: '/tmp'
};

const _multerInstance = _multer(_multerInstanceConfig);

app.post('/api/upload', [
	bodyParser.json()
], Meteor.bindEnvironment((request, response, next) => {
	const file = Files.findOne({
		_id: request.body['_id']
	});
	if (file !== null) {
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify({
			url: file.link()
		}));
	} else {
		response.writeHead(404, {
			'Content-Type': 'application/json'
		});
		response.end();
	}
}));

app.put('/api/upload', [
	_multerInstance.single('file')
], Meteor.bindEnvironment((request, response, next) => {
	if (request.file !== undefined) {
		response.writeHead(201, {
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify(Meteor.wrapAsync(async (callback) => {
			callback(null, await (() => {
				return new Promise((resolve, reject) => {
					_fs.stat(request.file.path, function (_statError, _statData) {
						const _addFileMeta = {
							fileName: request.file.originalname,
							type: request.file.mimetype,
							size: request.file.size
						};
						_fs.readFile(request.file.path, function (_readError, _readData) {
							Files.write(_readData, _addFileMeta, function (_uploadError, _uploadData) {
								resolve(_uploadData);
								_fs.unlink(request.file.path);
							}, true);
						});
					});
				});
			})());
		})()));
	} else {
		response.writeHead(400, {
			'Content-Type': 'application/json'
		});
		response.end();
	}
}));
