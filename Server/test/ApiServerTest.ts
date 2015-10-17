/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/sinon/sinon.d.ts" />
/// <reference path="../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/socket.io/socket.io.d.ts" />
/// <reference path="../../typings/socket.io-client/socket.io-client.d.ts" />
/// <reference path="../../typings/q/q.d.ts" />

require('mocha-sinon');
var sinonChai = require('sinon-chai');

import * as chai from 'chai';
import * as sinon from 'sinon';
chai.use(sinonChai);

var q: typeof Q = require('Q');

import * as WSChat from '../src/ApiServer'
import * as Repositories from '../src/Repositories'
import * as Data from '../../Common/src/Data'

import * as SocketIO from 'socket.io'
import * as SocketIOClient from 'socket.io-client'

var assert = chai.assert;

var now = Date.now();
var timeProvider: WSChat.IDateTimeProvider = {
	getDate: () => {
		return now;
	}
};

describe('The chat server', () => {
	it('should send a handshake with a nickname and the messages since the last half hour', () => {
		var mockOutput = Q.Promise<Data.Message[]>(() => {
			return [
				new Data.Message("Test message", "TestUser", now)
			]
		});
		
		var mockRepository: Repositories.IMessagesRepository = {
			getMessagesSince: sinon.spy(() => {
				return mockOutput;
			}),
			insertMessage: sinon.spy()
		};
		
		var server = new WSChat.Server(mockRepository, timeProvider);
		server.listen("localhost", "63452");
		
		var ioClient = SocketIOClient("http://localhost:63452/chat_server");
		ioClient.on('connect', () => {
			
		});
		
		assert.fail('Not implemented');
	});
});

