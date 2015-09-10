/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import * as Mongoose from "mongoose";
var q: typeof Q = require('Q');

import * as Data from '../../Common/src/Data';
import * as DBModels from './Models';

export interface IMessagesRepository {
	getMessagesSince(sourceTimestamp: number): Q.Promise<Data.Message[]>;
}

export class MessagesRepository implements IMessagesRepository {
	private db: Mongoose.Connection;
	
	public constructor (private connectionString?: string) {
		this.connectionString = connectionString || 'mongodb://localhost:27017/wschat';
	}
	
	private initializationPromise: Q.Promise<{}>;
	
	public initialize (): Q.Promise<{}> {
		if (this.initializationPromise) {
			return this.initializationPromise;
		}
		
		var initDeferred = q.defer();
		
		this.db = Mongoose.connect(this.connectionString).connection;
		this.db.on('error', initDeferred.reject);
		this.db.once('open', initDeferred.resolve);
		
		this.initializationPromise = initDeferred.promise;
		return this.initializationPromise;
	}
	
	public getMessagesSince(sourceTimestamp: number): Q.Promise<Data.Message[]> {
		var messagesDeferred = q.defer<Data.Message[]>();
		
		var messagesCallback = (err: any, res: DBModels.IMessageDocument[]) => {
			if (err) {
				messagesDeferred.reject(err);
				return;
			}
			
			var messages = res.map((value: DBModels.IMessageDocument) => {
				return new Data.Message(value.contents, value.author, value.timestamp);
			});
			messagesDeferred.resolve(messages);
		};
		
		DBModels.MessagesModel
			.find({})
			.where('timestamp')
			.gte(sourceTimestamp)
			.sort('+timestamp')
			.exec(messagesCallback);
		
		return messagesDeferred.promise;
	}
}
