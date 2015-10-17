/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import * as Mongoose from "mongoose";
var q: typeof Q = require('Q');

import * as Data from '../../Common/src/Data';
import * as DBModels from './Models';

export interface IMessagesRepository {
	getMessagesSince(sourceTimestamp: number): Q.Promise<Data.Message[]>;
	insertMessage(newMessage: Data.Message): Q.Promise<{}>;
}

export class MessagesRepository implements IMessagesRepository {
	private db: Mongoose.Connection;
	
	public constructor (connection: Mongoose.Connection) {
		if (connection == null) {
			throw new Error("The 'connection' argument must not be null");
		}
		
		if (connection.readyState !== 1) {
			throw new Error("The 'connection' argument must be ready/connected - actual state: " + connection.readyState);
		}
		
		this.db = connection;
	}
	
	public getMessagesSince(sourceTimestamp: number): Q.Promise<Data.Message[]> {
		var messagesQuery = 
			DBModels.MessagesModel
				.find({})
				.where('timestamp')
				.gte(sourceTimestamp)
				.sort('+timestamp');
		
		var messageQueryExecutor = 
			q.nbind<DBModels.IMessageDocument[]>(messagesQuery.exec, messagesQuery);
		
		return messageQueryExecutor()
			.then((result: DBModels.IMessageDocument[]) => {
				var messages = result.map((value: DBModels.IMessageDocument) => {
					return new Data.Message(value.contents, value.author, value.timestamp);
				});
				
				return messages;
			});
	}
	
	public insertMessage(newMessage: Data.Message): Q.Promise<{}> {
		var dbMessage = new DBModels.MessagesModel({
			author: newMessage.authorName,
			contents: newMessage.contents,
			timestamp: newMessage.timestamp
		});
		
		var dbMessageSave =
			q.nbind<DBModels.IMessageDocument> (dbMessage.save, dbMessage);
		
		return dbMessageSave();
	}
}

export interface INicknameGenerator {
	getNewRandomNickname(): string;
}
