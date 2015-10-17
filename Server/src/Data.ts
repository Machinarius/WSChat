import * as CommonData from '../../Common/src/Data'

export interface ConnectionHandshake {
	nickname: string;
	messages: CommonData.Message[];
}