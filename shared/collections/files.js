/**
 * https://github.com/VeliovGroup/Meteor-Files/wiki/GridFS-Integration
 */

import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import Grid from 'gridfs-stream';
import { MongoInternals } from 'meteor/mongo';
import fs from 'fs';

let gfs;
if (Meteor.isServer) {
	gfs = Grid(
		MongoInternals.defaultRemoteCollectionDriver().mongo.db,
		MongoInternals.NpmModule
	);
}

export const Files = new FilesCollection({
	collectionName: 'files',
	allowClientCode: true,
	debug: Meteor.isServer && process.env.NODE_ENV === 'development',
	onBeforeUpload(file) {
		return true;
	},
	onAfterUpload(file) {
		// Move file to GridFS
		Object.keys(file.versions).forEach(versionName => {
			const metadata = { versionName, fileId: file._id, storedAt: new Date() }; // Optional
			const writeStream = gfs.createWriteStream({ filename: file.name, metadata });

			fs.createReadStream(file.versions[versionName].path).pipe(writeStream);

			writeStream.on('close', Meteor.bindEnvironment(uploadedFile => {
				const property = `versions.${versionName}.meta.gridFsFileId`;
				// If we store the ObjectID itself, Meteor (EJSON?) seems to convert it to a
				// LocalCollection.ObjectID, which GFS doesn't understand.
				this.collection.update(file._id.toString(), {
					$set: {
						[property]: uploadedFile._id.toString()
					}
				});
				this.unlink(this.collection.findOne(file._id.toString()), versionName); // Unlink file by version from FS
			}));
		});
	},
	interceptDownload(http, file, versionName) {
		// Serve file from GridFS
		const _id = (file.versions[versionName].meta || {}).gridFsFileId;
		if (_id) {
			const readStream = gfs.createReadStream({ _id });
			readStream.on('error', err => {
				throw err;
			});
			readStream.pipe(http.response);
		}
		return Boolean(_id); // Serve file from either GridFS or FS if it wasn't uploaded yet
	},
	onAfterRemove(files) {
		// Remove corresponding file from GridFS
		files.forEach(file => {
			Object.keys(file.versions).forEach(versionName => {
				const _id = (file.versions[versionName].meta || {}).gridFsFileId;
				if (_id) gfs.remove({ _id }, err => {
					if (err) throw err;
				});
			});
		});
	}
});

if (Meteor.isServer) {
	Files.allowClient();
}
