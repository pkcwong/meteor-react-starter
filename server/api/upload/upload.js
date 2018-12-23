import { Meteor } from 'meteor/meteor';
import bodyParser from 'body-parser';
import { Files } from "/shared/collections/files";
import { app } from "../express";

const _multer = require('multer');
const _fs = require('fs');
const URL = require('url').URL;

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
	if (file !== undefined) {
		const url = new URL(file.link());
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});
		response.end(JSON.stringify({
			url: url.pathname
		}));
		return;
	}
	response.writeHead(404, {
		'Content-Type': 'application/json'
	});
	response.end();
}));

app.put('/api/upload', [
	_multerInstance.single('file')
], Meteor.bindEnvironment((request, response, next) => {
	if (request.file === undefined) {
		response.writeHead(400, {
			'Content-Type': 'application/json'
		});
		response.end();
		return;
	}
	_fs.stat(request.file.path, (_statError, _statData) => {
		if (_statError !== null) {
			response.writeHead(500, {
				'Content-Type': 'application/json'
			});
			response.end();
			return;
		}
		const _addFileMeta = {
			fileName: request.file.originalname,
			type: request.file.mimetype,
			size: request.file.size
		};
		_fs.readFile(request.file.path, (_readError, _readData) => {
			if (_readError !== null) {
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end();
				return;
			}
			Files.write(_readData, _addFileMeta, (_uploadError, _uploadData) => {
				_fs.unlink(request.file.path);
				if (_uploadError !== null) {
					response.writeHead(500, {
						'Content-Type': 'application/json'
					});
					response.end();
					return;
				}
				response.writeHead(201, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify(_uploadData));
			}, true);
		});
	});
}));
