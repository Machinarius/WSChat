/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import * as Mongoose from "mongoose";

import * as Data from '../../Common/src/Data';

export interface IMessagesRepository {
	getMessagesSince(sourceTimestamp: number): Q.Promise<Data.Message[]>;
}

export class MessagesRepository implements IMessagesRepository {
	public getMessagesSince(sourceTimestamp: number): Q.Promise<Data.Message[]> {
		throw new Error('Not implemented');
	}
}
