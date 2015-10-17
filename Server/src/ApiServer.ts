/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/express/express.d.ts" />

import * as Repositories from "./Repositories";

export class Server {
	public constructor(private messagesRepo: Repositories.IMessagesRepository, dateTimeProvider: IDateTimeProvider) {
		
	}
}

export interface IDateTimeProvider {
	getDate(): number;
}