/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/mongodb/mongodb.d.ts" />

import * as chai from 'chai';
import * as Mongo from 'mongodb';
import * as Mongoose from "mongoose";

var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mongodb');

import * as Repositories from '../src/Repositories';
import * as Data from '../../Common/src/Data'

var assert = chai.assert;

var mongoDb: Mongo.Db;
var mongooseCon: Mongoose.Connection;
var dataRepository: Repositories.MessagesRepository;

var dbAddress = 'mongodb://localhost:27017/wschat_test';
var messagesSeed = require('./MessagesSeed.json');

before((done: MochaDone) => {
	Mongo.MongoClient.connect(dbAddress, 
		(err: Error, db: Mongo.Db) => {
			if (!err) {
				mongoDb = db;
			}
			
			mongooseCon = Mongoose.connect(dbAddress, null, done).connection;
		});
});

beforeEach((done: MochaDone) => {
	mongoDb.collection('messages').insert(messagesSeed, (err: Error, result: any) => {
		done(err);
	});
	
	dataRepository = new Repositories.MessagesRepository(mongooseCon);
});

describe('The Messages Repository', () => {
	it("should return all the messages up from the specified point in time", (done: MochaDone) => {
		var expectedMessages: Data.Message[] = [
			new Data.Message ("I really like this", "MunchyKong31", 1438359484),
			new Data.Message ("This needs more dank memes", "IrateSloth45", 1440306000)
		];
		
		dataRepository.getMessagesSince(1438359484)
			.then((actualMessages: Data.Message[]) => {
				assert.deepEqual(actualMessages, expectedMessages, 
					"The returned messages did not match the expectation");
				done();
			})
			.catch(done);
	});
	
	it("should properly insert any message into the database", (done: MochaDone) => {
		var testMessage = new Data.Message("This is a test message", "Machinarius", new Date().getTime());
		
		var expectedMessages: Data.Message[] = [
			new Data.Message ("I really like this", "MunchyKong31", 1438359484),
			new Data.Message ("This needs more dank memes", "IrateSloth45", 1440306000),
			testMessage
		];
		
		dataRepository.insertMessage(testMessage)
			.then((newMessage: Data.Message) => {
				dataRepository.getMessagesSince(1438359484)
					.then((actualMessages: Data.Message[]) => {
						assert.deepEqual(actualMessages, expectedMessages, 
							"The returned messages did not match the expectation");
						done();
					})
					.catch(done);
			})
			.catch(done);
	});
});

afterEach((done: MochaDone) => {
	databaseCleaner.clean(mongoDb, done);
});

after((done: MochaDone) => {
	mongoDb.close(true, () => {
		Mongoose.disconnect(done);	
	});
});
