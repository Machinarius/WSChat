/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/mongodb/mongodb.d.ts" />

import * as chai from 'chai';
import * as Mongo from 'mongodb';

import * as Repositories from '../src/Repositories';

var assert = chai.assert;
var mongoDb: Mongo.Db;

var dbAddress = 'mongodb://localhost:27017/wschat_test';

before((done: MochaDone) => {
	Mongo.MongoClient.connect(dbAddress, 
		(err: Error, db: Mongo.Db) => {
			if (!err) {
				mongoDb = db;
			}
			
			done(err);
		});
});

describe('The Messages Repository', () => {
	it ('should throw an error if used before it is completely initialized', (done: MochaDone) => {
		var repository = new Repositories.MessagesRepository();
		assert.throws(() => repository.getMessagesSince(0), 'This repository instance has not been initialized');
		done();
	});
});
